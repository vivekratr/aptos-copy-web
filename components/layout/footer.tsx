import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Twitter, DiscIcon as Discord } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="https://i.imgur.com/30dS9w2.png"
              alt="Logo"
              className="h-8 w-8"
            />
            <span className="font-bold text-xl">AptosTrade</span>
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            AI-powered copy trading on the Aptos blockchain.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="text-muted-foreground hover:text-foreground"
            >
              FAQ
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
          </div>

          <div className="flex gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Discord className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

