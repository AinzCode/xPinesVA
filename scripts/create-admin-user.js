#!/usr/bin/env node

/**
 * Create Admin User Script
 * 
 * This script creates an admin user in both Supabase Auth and admin_users table
 * 
 * Usage:
 *   node scripts/create-admin-user.js
 * 
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL set in .env.local
 *   - SUPABASE_SERVICE_ROLE_KEY set in .env.local
 */

/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const readline = require('readline');
/* eslint-enable @typescript-eslint/no-require-imports */

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function createAdminUser() {
  console.log('\n🔐 Admin User Creation Tool\n');
  console.log('This will create a new admin user for your dashboard.\n');

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Error: Missing environment variables!');
    console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    // Get user input
    const email = await question('Enter admin email: ');
    const password = await question('Enter password (min 8 characters): ');
    const fullName = await question('Enter full name: ');
    const roleInput = await question('Enter role (admin/super_admin) [admin]: ');
    const role = roleInput.trim() || 'admin';

    console.log('\n⏳ Creating admin user...\n');

    // Step 1: Create auth user
    console.log('📝 Step 1: Creating authentication user...');
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email.trim(),
      password: password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName.trim()
      }
    });

    if (authError) {
      console.error('❌ Error creating auth user:', authError.message);
      if (authError.message.includes('already registered')) {
        console.log('\n💡 User already exists in auth. Trying to add to admin_users table...');
        
        // Get existing user
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
        if (listError) {
          console.error('❌ Error listing users:', listError.message);
          process.exit(1);
        }
        
        const existingUser = users.find(u => u.email === email.trim());
        if (!existingUser) {
          console.error('❌ Could not find existing user');
          process.exit(1);
        }

        // Try to add to admin_users
        const { error: adminError } = await supabase
          .from('admin_users')
          .insert({
            id: existingUser.id,
            email: email.trim(),
            full_name: fullName.trim(),
            role: role,
            is_active: true
          });

        if (adminError) {
          console.error('❌ Error adding to admin_users:', adminError.message);
          process.exit(1);
        }

        console.log('✅ Successfully added existing user to admin_users table!');
        console.log('\n📋 Admin User Details:');
        console.log(`   Email: ${email.trim()}`);
        console.log(`   Role: ${role}`);
        console.log(`   UUID: ${existingUser.id}`);
        rl.close();
        return;
      }
      process.exit(1);
    }

    console.log('✅ Auth user created with ID:', authData.user.id);

    // Step 2: Create admin_users entry
    console.log('📝 Step 2: Creating admin_users entry...');
    const { error: adminError } = await supabase
      .from('admin_users')
      .insert({
        id: authData.user.id,
        email: email.trim(),
        full_name: fullName.trim(),
        role: role,
        is_active: true
      });

    if (adminError) {
      console.error('❌ Error creating admin_users entry:', adminError.message);
      console.log('\n⚠️  Auth user was created but admin_users entry failed.');
      console.log('You can manually add to admin_users table using this SQL:');
      console.log(`
INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES ('${authData.user.id}', '${email.trim()}', '${fullName.trim()}', '${role}', true);
      `);
      process.exit(1);
    }

    console.log('✅ Admin user entry created!');

    // Success!
    console.log('\n🎉 Admin user created successfully!\n');
    console.log('📋 User Details:');
    console.log(`   Email: ${email.trim()}`);
    console.log(`   Full Name: ${fullName.trim()}`);
    console.log(`   Role: ${role}`);
    console.log(`   UUID: ${authData.user.id}`);
    console.log(`   Status: Active`);
    console.log('\n✅ You can now login at: /admin/login\n');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the script
createAdminUser();
