# textdiff-create

This is a simple module for creating **lean text diff deltas**, based on the excellent [fast-diff](https://github.com/jhchen/fast-diff) by [Jason Chen](https://github.com/jhchen).

Use in conjunction with [textdiff-patch](https://github.com/icflorescu/textdiff-patch).

## Usage

Assuming you've correctly installed the `npm` module with `npm i textdiff-create [--save|--save-dev]`:

    var createPatch = require('textdiff-create');

    var v1 = 'The sleepy brown fox';
    var v2 = 'The quick brown fox jumps over the lazy dog';

    var delta = createPatch(v1, v2);

    console.log(JSON.stringify(delta));

The script will produce the following output:

    [[0,4],[-1,6],[1,"quick"],[0,10],[1," jumps over the lazy dog"]]

Then you can use [textdiff-patch](https://github.com/icflorescu/textdiff-patch) to perform the reverse operation (build `v2` by applying `delta` to `v1`).

## Motivation

Modern web technologies permit editing large text blocks in client-side web applications. [CodeMirror](https://codemirror.net/) is perfectly usable with hundreds of lines of code and [ProseMirror](http://prosemirror.net/) will most likely enable users to easily edit entire ebooks in the browser, even on mobile devices. But mobile network cost is still an issue and sending the entire ebook content to the server on each save will always be impractical, even on HTTP 2.0.

There are many text diff tools in the Node.js ecosystem, but none of the ones I've seen is a straightforward solution able to produce a lean output free of redundant information, while also being optimized for client-side packaging with browserify or webpack.

Consider a scenario where users are editing large blocks of text content in a client-side application. Instead of sending the entire block of text to the server on each save, you'd ideally want to submit a "minimal patch" for each operation, containing just the relevant differences between the client-side version and the server-side version.

In the example above the user made 2 simple operations: replace the 2nd word and add 5 words in the end of the sentence.
Here's a quick comparison between `fast-diff` and `textdiff-create`:

    textdiff-create: 64 chars
    -------------------------
    [[0,4],[-1,6],[1,"quick"],[0,10],[1," jumps over the lazy dog"]]

    fast-diff: 86 chars
    -------------------------
    [[0,"The "],[-1,"sleepy"],[1,"quick"],[0," brown fox"],[1," jumps over the lazy dog"]]

Other text diff tools will produce an even more verbose output.

Verbosity is, of course, necessary for git-like transactions, but conciseness is preferable for simple text-editing scenarios (think blog posts, news stories, online book editing, etc.).

While the benefits are slim in the case of small strings, they are undoubtedly significant for recurring corrections on large bodies of text such as ebooks, especially over mobile data connections.

Correcting a misspelled word in a 100-kilobytes text will generate **around 100 kB of network traffic** if you're simply resending the entire content, **more than 100 kB** when using `fast-diff`, but **just a few bytes** with `textdiff-create`.

## FAQ

**Q**: Why splitting the functionality in two different packages?

**A**: To keep the deployed codebase and dependency graph to a minimum. Tipical usage involves creating deltas in a client-side application and applying them server-side. This tool **is about optimization**, so its own code should conform to the same basic principle: avoid sending unnecessary bytes over the network.

## Warning

Don't forget to devise a proper version-tracking mechanism in your project and include the version number in the client-server conversation. Otherwise you risk running into serious inconsistency issues.

## Credits

If you find this piece of software useful, please star the repo, [spread the word](http://twitter.com/share?text=Create%20lean%20text%20diff%20patches%20in%20JavaScript&url=https%3A%2F%2Fgithub.com%2Ficflorescu%2Ftextdiff-create&hashtags=javascript%2Cnode.js%2Cnpm&via=icflorescu) and feel free to endorse me on LinkedIn:

[![Ionut-Cristian Florescu on LinkedIn](https://static.licdn.com/scds/common/u/img/webpromo/btn_viewmy_160x25.png)](https://www.linkedin.com/in/icflorescu)

## LICENSE

Released under [ISC](https://github.com/icflorescu/textdiff-create/blob/master/LICENSE).
