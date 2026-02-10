# How to Show / Hide Navbar Links

All navbar links live in one file:

```
src/_includes/base.njk
```

Open it and find the `<ul>` block (around lines 27–31):

```html
<ul class="navbar-nav ml-auto">
    <li class="nav-item"><a class="nav-link" href="/paper_summaries/">Papers</a></li>
    <li class="nav-item"><a class="nav-link" href="/topic_summaries/">Topics</a></li>
    <li class="nav-item"><a class="nav-link" href="/blog/">Blog</a></li>
    <li class="nav-item"><a class="nav-link" href="/misc/">Misc.</a></li>
</ul>
```

## To remove links

Delete the `<li>` lines you don't want. For example, to keep only Misc:

```html
<ul class="navbar-nav ml-auto">
    <li class="nav-item"><a class="nav-link" href="/misc/">Misc.</a></li>
</ul>
```

Run `npm run build`. Every page on the site updates because they all inherit from this one file.

## To bring them back later

Add the `<li>` lines back in. The pages themselves still exist and still build even when unlinked — they just won't appear in the navbar. Anyone with the direct URL (e.g. `/paper_summaries/`) can still reach them.

## To add a new link

Add a new `<li>` line pointing to the page's `permalink`:

```html
<li class="nav-item"><a class="nav-link" href="/my-new-page/">New Page</a></li>
```
