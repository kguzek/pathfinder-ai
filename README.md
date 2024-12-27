# Pathfinder AI

This is a simple generative algorithm which finds the path to a goal. You can check it out here:

[https://kguzek.github.io/pathfinder-ai](https://kguzek.github.io/pathfinder-ai)

The pathfinding is simulated with dots which traverse a 2-dimensional plane towards a green dot, which is the goal.

The population is initialised with 1000 dots which move in completely random directions. They move a random number of times, and at the end they are scored based on their distance to the goal, whether or not they reached it, and how many steps it took them.

Each iteration of the simulation chooses the best-performing dots and mutates them in order to optimise the pathfinding process. The best-performing dot of the previous generation is highlighted in blue.

The first dots will reach the goal only at around generation ~70, so until then it's quite uneventful.

## Installation

If you want to modify the web version, just clone the repository and modify the files in `/docs` directly. You can see the changes instantly by opening `/docs/index.html`, or by using an extension like `Live Server` for VS Code.

If you want to modify the Processing version, install [Processing](https://processing.org/) (a somewhat Pythonised spinoff of Java). Then, open the repository folder in the Processing IDE (or another editor with a Processing extension installed), and make your changes in the `.pde` files.

## Credits

This project was a pretty much carbon copy of CodeBullet's project, showcased in his [How AIs Learn](https://www.youtube.com/watch?v=BOZfhUcNiqk) video. I've also converted it to JavaScript using [p5.js](https://p5js.org/), so it can be run in the browser.

Thank you [@Code-Bullet](https://github.com/Code-Bullet) for sparking an interest in AI/ML in me!
