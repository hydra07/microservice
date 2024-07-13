import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";

export default function Component() {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl">
                Discover the Joy of Cooking
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Explore thousands of delicious recipes and connect with a community of passionate home cooks.
              </p>
              <Button className="inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Get Started
              </Button>
            </div>
            <img
              src="/images/hero-image.jpg"
              width={800}
              height={600}
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
            />
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container grid md:grid-cols-2 gap-8 items-center">
            <img
              src="/images/learn-to-cook.jpg"
              width={800}
              height={600}
              alt="Learn How to Cook"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
            />
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Learn How to Cook
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find step-by-step cooking guides, tips, and tricks from professional chefs and home cooks alike.
              </p>
              <Button className="inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Start Learning
              </Button>
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Post About Dishes and Feedback
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Share your culinary creations and get feedback from the community. Improve your cooking skills and inspire others.
              </p>
              <Button className="inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Post Now
              </Button>
            </div>
            <img
              src="/images/post-dishes-feedback.jpg"
              width={800}
              height={600}
              alt="Post About Dishes and Feedback"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
            />
          </div>
        </section>
        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Upload Your Own Recipe Now
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Share your culinary creations with our community and inspire others to cook.
                </p>
              </div>
              <Button className="inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Upload Recipe
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
