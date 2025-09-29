
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import { MainHeader } from '@/components/main-header';

export default function SearchPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
        <MainHeader />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 md:gap-8 md:p-8 md:pl-64 pb-28 md:pb-8">
            <div className="mx-auto w-full max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Search Alerts</CardTitle>
                  <CardDescription>
                    Find alerts by keyword, category, or location.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex w-full items-center space-x-2">
                    <div className="relative flex-1">
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-10"
                      />
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <Button type="submit" className="glossy-button">Search</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
        </main>
    </div>
  );
}
