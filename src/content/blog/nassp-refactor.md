---
title: 'NASSP Refactoring Ideas'
description: 'Re-engineering a 20-year-old space flight simulator'
pubDate: 'Sep 5, 2024'
heroImage: '/img/blog/nassp-refactor/thumb.png'
---

Hoo boy, this one is probably going to be a doozy. For those of you who aren't familiar with NASSP, check out [this post.](/blog/what-is-nassp)

And good grief, how much code that requires! As I write this, there's approximately *300,000 lines of code*:

![Codebase statistics](/img/blog/nassp-refactor/nassp_code_count.png)

Yeah. It's pretty daunting. And while I haven't yet had the opportunity (or perhaps, displeasure?) to work on any serious legacy codebases in a professional capacity, I have to imagine this is remarkably close to what that's like, minus the deadlines and all the additional responsibilities that a real job would have. Anyway, the point of the matter is that NASSP's code is an almost unfathomably large pool that's had dozens of different contributors over the years since its inception in 2003, and the current codebase's history beginning in 2005. That's a lot of different programmers with different coding styles, different versions of the C++ language and its features, and different amounts of programming experience. Not to mention, the project had a lot more humble intentions when it first started. Only in the last 10 years or so has the focus really shifted towards all-out accuracy and attention to detail, helped in part by the gradual archival and scanning of original Apollo documents. As a result... things are messy. Really messy. So much of the foundational code and structure we use for processing and drawing visuals remains largely unchanged in over a decade. And consequently, with each new feature or system we add, the strain on the most archaic segments of code increases.

But if improving things were an easy task, it would have been done long ago. Not to mention: people far smarter and more accomplished than than me have made blog posts and articles about this kind of thing before. So, I'd like to focus on the areas I'm aware of where I think NASSP stands to benefit from reworking or refactoring. This may very well turn into a series, as I explore the codebase more and discover new things that could be improved, or make progress towards something in particular.

## Build System and Project Files

