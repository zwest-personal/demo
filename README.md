# EVERYTHING IS A WORK IN PROGRESS
The composition build doesn't work quite yet, working to get basic versions of all the services up and linked
so that there's a good foundation for fleshing them all out.

There might be things not quite working, or just stubbed, or in pieces.  I gave myself a pretty hefty goal with this
so it's not an overnight effort to flesh it out.

# demo
Demo project, featuring a cross-set of a bunch of languages and tech just for the sake of demonstrating 
competencies (Go, Node), hone my existing skills (Python), because I wanted to have an excuse to learn them 
(Rust, React), or just because they're in demand and I seem to have to end up using them anyways even in a 
hacky fashion (C#).

The end goal will be something silly, fun, and utterly useless in any business environment so I'll feel okay sharing
it.  Hopefully replacing any live coding tests as I really detest those (as both a candidate and an interviewer) and
always felt having a sort of 'pet project' available to show to recruiters/interviewers is a far, FAR better option.

There's additional tech I have worked with I thought about folding in as well, such as K8S, Helm, AWS integration,
github Actions,etc, but scope for a fun/job seeking project was already pretty large so I'm holding off on those
unless I get pretty far in.

## AI

AI was not used to generate any code from scratch or functionality.

Given the realities of how it's entering our field, I did decide to make use of it somewhat - 
I work in IntelliJ, which offers an integrated AI assistant.  I used it purely in 'offline' mode and specifically
for how it does a (remarkably solid) job filling out boilerplate that you've started.  Since this is the most tedious
bit of work for any major new project you don't have a solid library set built up for I can appreciate it for that,
especially since it could do it without any Cloud AI/LLM interaction.  In other words, I used it basically
as a fancier version of IntelliJ's existing/past helpers (like pre-filling a Go struct) where it saves me time
just typing out a bunch of stuff that requires no thought or logic.

Ultimately the use of AI in any software engineering job is going to be a complicated subject - submitting proprietary
code (or documentation or JIRA projects or whatever) to a cloud LLM that's basically a black box is a huge nono. 
The AI models so far seem very coy about how well they actually isolate your data and given how they were trained
I have very little trust for them.

### AI Also

As part of this project I *am* folding PyTorch into the conductor, just as a learning experience and to see what
shenanigans I can cook up with it.

## Running

NEVERMIND

IGNORE ALL THIS UNTIL I CIRCLE BACK TO THE MAKE

To run it all together, use:
`make composition`
Requires docker.  Will build and spin up all the components and then make everything available

`make composition insecure`
Same as above but will configure the UI to listed on HTTP 8080 instead of HTTPS 8083

To run individual services (outside Docker), use:
`make service [servicename]`
eg `make service go-performer`

To run front end (also outside Docker), use:
`make site [sitename]`
eg `make site dothething`

