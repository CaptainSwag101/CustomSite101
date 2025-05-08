---
title: "NASSP Refactoring - Modular Panel System, Part 1"
description: 'Or: "Let''s try not to hard-code everything this time"'
pubDatetime: 2024-11-05T15:36:00-08:00
ogImage: "@/assets/images/nassp-refactor-modular-panels-pt1/thumb.png"
tags:
  - nassp
  - programming
  - space
  - Project Apollo
  - refactoring
  - modular panels
---

This has been at the forefront of my mind lately when thinking about potential improvements for NASSP's core functionality. To establish a crucial definition first, a "panel" in the context of NASSP and Orbiter is a data structure representing a viewable region within the vessel. This panel is displayed to the pilot and rendered on top of the 3D scene the vessel is currently located within (such as flying through space or on a celestial body). A vessel typically has one or more panels to represent various locations or "viewpoints" within a vessel's cockpit or cabin area. They often contain dynamic elements like switches, gauges, computer displays, and other controls, all of which are used for interacting with the vessel and receiving information about the status of various systems. These panels can be 2D images or mapped to a 3D model dubbed the "virtual cockpit" or "VC".

Within our code is a library called "PanelSDK" which is a bit of a misnomer. It was added into our project from what is now a long-gone Orbiter addon site, archived [here](https://web.archive.org/web/20051017194639/http://217.10.196.198:80/Orbiter/main.html). Originally, it was intended to be used to allow for both modular panel components to be displayed to the user as well as modular subsystems that drove the various displays, gauges, etc. However, while NASSP makes extensive use of the modular systems functionality of this library (which I will inevitably have to make a post about refactoring), all of the panel-related functionality [was removed about a year ago](https://github.com/orbiternassp/NASSP/commit/ed16e1f0614af56eb780ff066ff97131931ecd66), since it appears to have gone unused for the lifespan of the project. Instead, most—if not all—of our panel code involves hard-coded... everything. Pointers to gauges and switches are stored directly in the vessel classes, and the routines associated with refreshing the state of gauges/components and drawing them to the screen are monstrous switch/case blocks relying on long strings of `#define` statements to declare the internal codenames of every individual component or object on the panel that must be drawn or processed.

You might ask, "why fix what isn't broken?" The current system works, but it is deficient in a critical way that hinders the continued development of NASSP. Because everything is hard-coded, adding new objects to the panel or rearranging things is nearly impossible. This is very frustrating, because nearly every CM and LM unit produced had a slightly different control panel configuration. Switches and circuit breakers were added or removed, some controls changed location, and in particular, Apollo 7's Command Module had a couple panels with drastically different layouts compared to all later CMs. Right now we have a very hacky and rigid way of allowing for different missions to have slightly different panel layouts, but they all have to be similarly hardcoded, which only adds to the growing mess that is our panel code (which may itself be some of the most complex panel code of any Orbiter addon). As a result, there is an uphill battle facing anyone who wants to start implementing the multitude of overdue mission-specific vehicle panel changes, so only one or two have actually been done in all these years. What would make this process so much easier would be a modular system that builds panels from a data source at vessel initialization time, with gauges and switches and other dynamic objects populated based on a config file designed around each revision of each vessel, preferably with some reusability so we don't have to copy the whole file contents when only a handful of switches move around.

Rather than reverting the change that removed the modular panel code from PanelSDK and trying to begin using it, I feel it would be more appropriate to create a new, modern system that fits NASSP's needs. While there's something to be said about not reinventing the wheel, a lot of the PanelSDK code is archaic and makes heavy use of pointer math and manually allocated buffers for its parsing and processing logic. This might have been necessary at the time of its creation in the mid-2000s, but such practices can be avoided these days thanks to improvements in the C++ standard library. Not only do we have smart pointers and safer methods of dealing with text parsing, but we also have efficient data structures provided by the STL which will let us use a more appropriate collection than the singly-linked lists that PanelSDK loves so much.

So, what exactly might a from-scratch modular panel system look like? Here's a simplified dragram that illustrates a possible "information flow" for how we would define the panels to be used for our vessels and how that data would be subsequently built at runtime into something the user can see and interact with:

![Flow diagram of how the panels might be "built"](@/assets/images/nassp-refactor-modular-panels-pt1/flow-diagram.png)

So, with that general design in mind, the next path I travelled down was: what format to use for our config files? The existing PanelSDK systems code parses its own custom config syntax which vaguely resembles XML. However the parsing code for that, as previously mentioned, is rife with pointer math and other obtuse logic that is no longer well-understood or easy to scale. Even so, designing a _new_ custom format would be rather silly when there are countless formats already designed and that have stable parsers for C++. My first thought was JSON, but while it is extremely mature and well-supported, its syntax can be a bit cumbersome to read in a text editor or make manual changes to. Not to mention, it's likely more complex than our needs require. So, [TOML (Tom's Obvious, Minimal Language)](https://toml.io/en/) seemed like a decent fit. There appears to be a [rather mature parsing library](https://marzer.github.io/tomlplusplus/) designed for modern C++ versions which was also GPL-compatible and featured a single-include header-only version that means no extra work necessary to integrate it into our project. Here's a basic example of what a panel config file would look like:

```toml
[[panels]]
name = "MainPanel"
width = 2700
height = 1920
#neighbor.up = "OverheadWindow"
#neighbor.down = "FrontHatch"
neighbor.left = "LeftWindow"
neighbor.right = "RightWindow"
texture = "lem_main_panel.dds"

[[panels]]
name = "LeftWindow"
width = 1920
height = 1080
neighbor.right = "MainPanel"
texture = "lem_left_window.dds"

[[panels]]
name = "RightWindow"
width = 1920
height = 1080
neighbor.left = "MainPanel"
texture = "lem_right_window.dds"

[[panels]]
name = "LeftPanel"

[[panels]]
name = "RightPanel"
```

But even with the assistance of the library to parse the data, we still need to validate it according to our own rules, beyond simply ensuring its syntax is valid TOML. The above config already includes one example of an error: "LeftPanel" and "RightPanel" are missing both their width and height values as well as their texture filename. If such critical errors occurred in our systems config files, the sim would probably crash outright with little or no error information to help the end-user (or developers) figure out what went wrong. Since we're not relying on any of that old code to do our panel loading and validation, we can try to be more proactive about screening out errors and printing useful debug information. At the time of writing, the parsing/validation code consists of just over 70 lines, and it's only going to grow larger as the panel config schema becomes more fleshed-out and advanced. I'm not trying to make something particularly complicated, but the example above is the absolute bare minimum needed to define a panel from data, with zero interactivity or additional components.

This is what has been implemented into my work-in-progress branch so far. My next goal is to implement all of the panels in the LM, and then implement the CSM panels, since that vehicle's code is older and more convoluted. After the basic panels are all set up, it will be time to start refactoring the various switches, gauges, etc. so that they work properly with the new panel drawing code. There's still a whole lot more work to be done to accomplish all that, which I hope to discuss in a future post. Until then, I hope you found this interesting!
