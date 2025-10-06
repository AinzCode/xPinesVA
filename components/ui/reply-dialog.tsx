'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReplyDialogProps {
  id: string;
  type: 'inquiry' | 'testimonial';
  recipientName: string;
  recipientEmail: string;
  defaultSubject?: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function ReplyDialog({
  id,
  type,
  recipientName,
  recipientEmail,
  defaultSubject,
  trigger,
  onSuccess,
}: ReplyDialogProps) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState(
    defaultSubject || `Re: Your ${type === 'inquiry' ? 'inquiry' : 'testimonial'} with Pines VA`
  );
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: 'Missing fields',
        description: 'Please provide both subject and message',
        variant: 'destructive',
      });
      return;
    }

    setIsSending(true);

    try {
      const endpoint =
        type === 'inquiry'
          ? `/api/inquiries/${id}/reply`
          : `/api/testimonials/${id}/reply`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [type === 'inquiry' ? 'inquiryId' : 'testimonialId']: id,
          subject,
          message,
          recipientEmail,
          recipientName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || 'Failed to send reply';
        const errorDetails = data.details ? ` - ${data.details}` : '';
        console.error('API Error:', data);
        throw new Error(`${errorMessage}${errorDetails}`);
      }

      toast({
        title: 'Reply sent!',
        description: `Your reply has been sent to ${recipientName}`,
      });

      // Reset form and close dialog
      setSubject(defaultSubject || `Re: Your ${type === 'inquiry' ? 'inquiry' : 'testimonial'} with Pines VA`);
      setMessage('');
      setOpen(false);

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      toast({
        title: 'Failed to send',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Reply
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Send Reply</DialogTitle>
          <DialogDescription>
            Send an email reply to {recipientName} ({recipientEmail})
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
              disabled={isSending}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={10}
              disabled={isSending}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Your message will be sent from your admin email address
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSending}
          >
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={isSending}>
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Reply
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
