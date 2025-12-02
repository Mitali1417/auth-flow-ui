import { Button } from '@/components/ui/button';
import { Github, Chrome } from 'lucide-react';

export function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => console.log('GitHub login')}
      >
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => console.log('Google login')}
      >
        <Chrome className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}