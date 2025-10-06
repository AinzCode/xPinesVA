#!/usr/bin/env node

/**
 * Create Admin User Script
 * 
 * This script creates an admin user in both Supabase Auth and the admin_users table
 * 
 * Usage:
 *   node scripts/create-admin.js
 * 
 * You'll be prompted for:
 *   - Email
 *   - Password
 *   - Full Name
 *   - Role (admin or super_admin)
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('\n========================================');
  console.log('  Pines VA - Create Admin User');
  console.log('========================================\n');

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Error: Missing environment variables!');
    console.error('Please make sure these are set in your .env.local:');
    console.error('  - NEXT_PUBLIC_SUPABASE_URL');
    console.error('  - SUPABASE_SERVICE_ROLE_KEY\n');
    process.exit(1);
  }

  console.log('✅ Environment variables found\n');

  // Get user input
  const email = await question('Email address: ');
  const password = await question('Password (min 6 characters): ');
  const fullName = await question('Full Name: ');
  const role = await question('Role (admin/super_admin) [super_admin]: ') || 'super_admin';

  console.log('\n📋 Summary:');
  console.log(`  Email: ${email}`);
  console.log(`  Name: ${fullName}`);
  console.log(`  Role: ${role}`);
  console.log('  Password: ••••••••\n');

  const confirm = await question('Create this admin user? (yes/no): ');

  if (confirm.toLowerCase() !== 'yes' && confirm.toLowerCase() !== 'y') {
    console.log('❌ Cancelled\n');
    rl.close();
    return;
  }

  console.log('\n🔄 Creating user...\n');

  try {
    // Create auth user
    console.log('1️⃣ Creating authentication user...');
    const authResponse = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey
      },
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName
        }
      })
    });

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      throw new Error(`Auth creation failed: ${authResponse.status} - ${errorText}`);
    }

    const authData = await authResponse.json();
    const userId = authData.id;
    console.log(`✅ Auth user created with ID: ${userId}\n`);

    // Create admin_users record
    console.log('2️⃣ Adding to admin_users table...');
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .insert({
        user_id: userId,
        email,
        name: fullName,
        role
      })
      .select()
      .single();

    if (adminError) {
      throw new Error(`Admin user creation failed: ${adminError.message}`);
    }

    console.log('✅ Admin user record created\n');

    console.log('========================================');
    console.log('✅ SUCCESS! Admin user created');
    console.log('========================================\n');
    console.log('📝 User Details:');
    console.log(`  User ID: ${adminUser.user_id}`);
    console.log(`  Email: ${adminUser.email}`);
    console.log(`  Name: ${adminUser.name}`);
    console.log(`  Role: ${adminUser.role}\n`);
    console.log('🔐 You can now log in at: /admin/login\n');

  } catch (error) {
    console.error('\n❌ Error creating admin user:');
    console.error(error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('  1. Check your SUPABASE_SERVICE_ROLE_KEY is correct');
    console.error('  2. Make sure the email is not already in use');
    console.error('  3. Verify your Supabase project URL is correct');
    console.error('  4. Check the admin_users table exists in your database\n');
  } finally {
    rl.close();
  }
}

main();
