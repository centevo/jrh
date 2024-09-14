// Drag and Move mouse around
// Hope you like it :)
// @shunyadezian

console.clear();

gsap.registerPlugin(
	MorphSVGPlugin,
	DrawSVGPlugin,
	SplitText,
	Draggable,
	InertiaPlugin
);

const container = document.getElementById("grid_container");

// REVEAL GRID ITEM
const boxes = gsap.utils.toArray(".box");
gsap.to(boxes, {
	autoAlpha: 1,
	duration: 0.8,
	stagger: 0.1,
	ease: "power1.inOut"
});

// Following Eye
// ref: https://gsap.com/community/forums/topic/17962-cursor-follows-the-eyes/
container.addEventListener("mousemove", (e) => {
	const { clientX, clientY } = e;
	const maxTrans = 20;
	const maxX = container.clientWidth / 2;
	const maxY = container.clientHeight / 2;

	const eye = document.querySelectorAll(".eye");
	const pupil = document.querySelectorAll(".eye-pupil");

	for (let i = 0; i < eye.length; i++) {
		const eyeRect = eye[i].getBoundingClientRect();
		const r = eyeRect.width / 2;
		const centerX = eyeRect.left + r;
		const centerY = eyeRect.top + r;

		const x = clientX - centerX;
		const y = clientY - centerY;

		const xPercent = x / maxX;
		const yPercent = y / maxY;

		const scaledXPercent = xPercent * maxTrans;
		const scaledYPercent = yPercent * maxTrans;

		gsap.to(pupil[i], {
			xPercent: scaledXPercent,
			yPercent: scaledYPercent,
			duration: 0.2,
			overwrite: "auto"
		});

		gsap.to(eye[i], {
			xPercent: scaledXPercent * 0.4,
			yPercent: scaledYPercent * 0.4,
			duration: 0.2,
			overwrite: "auto"
		});
	}
});

// ROTATING STARS
const starTL = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

starTL
	.to(".star", {
		rotate: 360,
		transformOrigin: "50% 50%",
		duration: 1,
		stagger: 0.5
	})
	.to(".star", {
		scale: 1.5,
		transformOrigin: "50% 50%",
		duration: 0.2,
		ease: "power1.out",
		repeat: 1,
		yoyo: true
	});

// ROTATING CIRCLES
gsap.to("#circles", {
	y: -200,
	duration: 1.5,
	ease: "none",
	repeat: -1
});

gsap.to(".circle", {
	rotate: 360,
	transformOrigin: "50% 50%",
	duration: 3,
	repeat: -1,
	ease: "none"
});

// MORPHING BOXES
const morphBoxes = gsap.utils.toArray(".morph-box");
const morphDuration = 1;
morphBoxes.forEach((box, i) => {
	gsap.to(box, {
		morphSVG: `#morph-shape-${i + 1}`,
		duration: morphDuration,
		ease: "power1.inOut",
		repeat: -1,
		yoyo: true,
		delay: i * 0.1
	});

	gsap.to(`#box-top-${i + 1}`, {
		y: 19,
		x: 19,
		duration: morphDuration,
		ease: "power1.inOut",
		repeat: -1,
		yoyo: true,
		delay: i * 0.1
	});
});

// HALF CIRCLES
const halfCircleTl = gsap.timeline({ repeat: -1 }).timeScale(0.5);
const halfCircleEase = "power2.inOut";
const halfCirclesScale = {
	scale: 0,
	transformOrigin: "0% 50%",
	ease: halfCircleEase
};
halfCircleTl
	.to("#half-circle-1", {
		...halfCirclesScale
	})
	.to(
		"#half-circle-2",
		{
			x: -50,
			ease: halfCircleEase
		},
		"<"
	)
	.to(
		"#half-circle-3",
		{
			x: -50,
			transformOrigin: "0% 50%",
			ease: halfCircleEase
		},
		"<"
	)
	.to(
		"#half-circle-4",
		{
			x: -50,
			ease: halfCircleEase
		},
		"<"
	)
	.to("#half-circle-2", {
		...halfCirclesScale
	})
	.to(
		"#half-circle-3",
		{
			x: -100,
			ease: halfCircleEase
		},
		"<"
	)
	.to(
		"#half-circle-4",
		{
			x: -100,
			ease: halfCircleEase
		},
		"<"
	);

// FOLLOWING STARS
// ref: https://gsap.com/community/forums/topic/30502-mouse-cursor-follow-animation/
const starContainer = document.querySelector("#following-stars");

gsap.set(".following-star", {
	xPercent: -50,
	yPercent: -50,
	x: 0,
	y: 100,
	transformOrigin: "center",
	scale: 0
});

let initialMouseMove = true;
let timer;

starContainer.addEventListener("mousemove", (e) => {
	const { clientX, clientY } = e;

	const containerRect = starContainer.getBoundingClientRect();
	const centerX = containerRect.left;
	const centerY = containerRect.top;

	const x = clientX - centerX;
	const y = clientY - centerY;

	// if it's the first mouse movement run this
	if (initialMouseMove) {
		initialMouseMove = false;

		gsap.to(".following-star", {
			scale: 0.4,
			stagger: 0.02,
			ease: "sine.out"
		});
	}

	const mouseStopped = () => {
		// reset this variable
		// so we can track the first mouse move again
		initialMouseMove = true;

		gsap.to(".following-star", {
			scale: 0,
			stagger: 0.02,
			ease: "sine.inOut"
		});
	};

	// // clear the timer every time the mouse moves
	clearTimeout(timer);
	// // set a timer for 0.2 second
	timer = setTimeout(mouseStopped, 20);
	gsap.to(".following-star", {
		duration: 0.5,
		overwrite: "auto",
		x: x / 2,
		y: y / 2,
		stagger: 0.1,
		ease: "none"
	});
});

// MORPHING HEART
gsap.to("#morph-heart", {
	morphSVG: `#morph-lip`,
	duration: 2,
	ease: "power3.inOut",
	repeat: -1,
	yoyo: true
});

// STRIPES
gsap.set(".square-stroke", {
	drawSVG: 0
});
gsap.to(".square-stroke", {
	drawSVG: '100% "100%"',
	duration: 2,
	ease: "power3.out",
	repeat: -1,
	yoyo: true,
	stagger: 0.1
});

gsap.set(".square-stroke-right", {
	drawSVG: "100% 100%"
});
gsap.to(".square-stroke-right", {
	drawSVG: "0% 100%", // reverse
	duration: 2,
	ease: "power3.out",
	repeat: -1,
	yoyo: true,
	stagger: 0.1
});

// RANDOM CIRCLES
const randomCircleTl = gsap.timeline({ repeat: -1, repeatRefresh: true });

randomCircleTl
	.to(".random-circle", {
		x: () => gsap.utils.random(-40, 40, 5),
		y: () => gsap.utils.random(-40, 40, 5),
		scale: 0,
		transformOrigin: "center"
	})
	.to(".random-circle", {
		scale: () => gsap.utils.random(0.7, 1, 0.1),
		duration: 1,
		ease: "power3.inOut",
		stagger: 0.2
	});

// STREACH BARS
gsap.to(".bar", {
	y: -5,
	duration: 1,
	ease: "power1.inOut",
	repeat: -1,
	yoyo: true,
	stagger: 1
});

gsap.to("#bar-1", {
	morphSVG: "#morph-bar-1",
	duration: 1,
	ease: "power3.inOut",
	repeat: -1,
	yoyo: true
});

gsap.to("#bar-1-circle-1", {
	y: 40,
	duration: 1,
	ease: "power3.inOut",
	repeat: -1,
	yoyo: true
});

gsap.to("#bar-2", {
	morphSVG: "#morph-bar-2",
	duration: 3,
	ease: "sine.inOut",
	repeat: -1,
	yoyo: true
});

gsap.to("#bar-2-circle-2", {
	y: -40,
	duration: 3,
	ease: "sine.inOut",
	repeat: -1,
	yoyo: true
});

gsap.to("#bar-3", {
	morphSVG: "#morph-bar-3",
	duration: 2,
	ease: "circ",
	repeat: -1,
	yoyo: true
});

gsap.to("#bar-3-circle-1", {
	y: 30,
	duration: 2,
	ease: "circ",
	repeat: -1,
	yoyo: true
});

// ROTATING DISK
gsap.to("#disk", {
	rotate: 360,
	transformOrigin: "50% 50%",
	duration: 3,
	ease: "elastic.out(1,0.5)",
	repeat: -1,
	yoyo: true
});

// ARROWS
const arrowTL = gsap.timeline({ repeat: -1 });
arrowTL
	.to("#arrow-1", {
		scale: 0,
		transformOrigin: "top center",
		duration: 1,
		ease: "power3.inOut"
	})
	.to(
		"#arrow-2",
		{
			y: -50,
			duration: 1,
			ease: "power3.inOut"
		},
		"<"
	)
	.to("#arrow-3", {
		y: -50,
		duration: 1,
		ease: "power3.inOut"
	})
	.to("#arrow-2", {
		scale: 0,
		transformOrigin: "top center",
		duration: 1,
		ease: "power3.inOut"
	})
	.to(
		"#arrow-3",
		{
			y: -100,
			duration: 1,
			ease: "power3.inOut"
		},
		"<"
	)
	.to("#arrow-4", {
		y: -100,
		duration: 1,
		ease: "power3.inOut"
	});

// LINE DRAWING
const line = document.querySelector("#lines");
const lineOrigin = document.querySelector("#lines path");

// Number of duplicates
const numOfLines = 20;

for (let i = 0; i < numOfLines; i++) {
	const clonedPath = lineOrigin.cloneNode(true);
	clonedPath.setAttribute("class", "line");
	line.appendChild(clonedPath);
}

const lines = gsap.utils.toArray(".line");

lines.forEach((line, i) => {
	gsap.set(line, {
		drawSVG: "100% 0%",
		rotate: (i * 180) / numOfLines,
		transformOrigin: "center"
	});
});

gsap.to(lines, {
	rotate: "+=360",
	ease: "power3.inOut",
	repeat: -1,
	stagger: 0.1,
	duration: 4
});

gsap.to("#lines path", {
	drawSVG: "100% 50%",
	duration: 2,
	ease: "power3.inOut",
	repeat: -1,
	yoyo: true,
	stagger: 0.1
});

// STACK ELIPSES
const ellipse = document.querySelector("#ellipse");
const ellipsOrigin = document.querySelector("#ellipse ellipse");

// Number of duplicates
const numOfEllipses = 10;

for (let i = 0; i < numOfEllipses; i++) {
	const clonedPath = ellipsOrigin.cloneNode(true);
	ellipse.appendChild(clonedPath);
}

const ellipses = gsap.utils.toArray(".ellipse");

ellipses.forEach((ellipse, i) => {
	gsap.set(ellipse, {
		transformOrigin: "bottom center"
	});
});

gsap.to(ellipses, {
	y: 50,
	fill: "#9d2719",
	ease: "power3.inOut",
	stagger: 0.1,
	repeat: -1,
	duration: 1,
	yoyo: true
});

// BALLANCING BALLS
const ballContainer = document.querySelector("#balancing-balls");

gsap.set("#balance-ball-1", {
	xPercent: -190,
	transformOrigin: "center",
	x: 50
});
gsap.set("#balance-ball-2", {
	xPercent: -130,
	transformOrigin: "center",
	x: 50
});
gsap.set("#balance-ball-3", {
	xPercent: -70,
	transformOrigin: "center",
	x: 50
});

ballContainer.addEventListener("mousemove", (e) => {
	const { clientX } = e;

	const containerRect = ballContainer.getBoundingClientRect();
	const centerX = containerRect.left;

	const x = clientX - centerX;

	gsap.to("#balance-ball-1", {
		duration: 0.5,
		overwrite: "auto",
		x: x / 2,
		ease: "power4.out"
	});
	gsap.to("#balance-ball-2", {
		duration: 0.5,
		overwrite: "auto",
		x: x / 2,
		ease: "power4.out",
		delay: 0.02
	});
	gsap.to("#balance-ball-3", {
		duration: 0.5,
		overwrite: "auto",
		x: x / 2,
		ease: "power4.out",
		delay: 0.045
	});
});

ballContainer.addEventListener("mouseleave", () => {
	gsap.to(".ball", {
		x: 50,
		stagger: 0.05,
		ease: "sine.inOut"
	});
});

// SPLIT TEXT
const title = document.querySelector(".title");
const split = new SplitText(title, { type: "chars" });
gsap.from(split.chars, {
	duration: 0.5,
	y: 100,
	stagger: 0.1,
	ease: "back.out"
});

const titleSpinTL = gsap.timeline({ paused: true });
titleSpinTL.to(split.chars, {
	duration: 0.5,
	rotateY: 360,
	stagger: 0.1,
	repeat: 1,
	yoyo: true
});

title.addEventListener("mouseenter", () => {
	titleSpinTL.restart();
});

////////////////////////////////////
// GRID SYSTEM
////////////////////////////////////

//ref: https://codepen.io/osublake/pen/NrRJwm?editors=0110
//ref: https://codepen.io/GreenSock/pen/JjwZzNG?editors=0010

const colSize = 200;
const rowSize = 200;
const gridRows = 4;
const gridColumns = 4;

function createGrid(gridRows, gridColumns) {
	for (let i = 0; i < gridRows * gridColumns; i++) {
		const y = Math.floor(i / gridColumns) * rowSize;
		const x = (i * colSize) % (gridColumns * colSize);

		const cell = document.createElement("div");
		cell.classList.add("cell");
		cell.style.width = colSize - 1 + "px";
		cell.style.height = rowSize - 1 + "px";
		cell.style.top = y + "px";
		cell.style.left = x + "px";
		container.appendChild(cell);
	}
}

createGrid(gridRows, gridColumns);

let clampCol = gsap.utils.clamp(0, gridColumns - 1);
let clampRow = gsap.utils.clamp(0, gridRows - 1);

let cells = [];

// Map cell locations to array
for (let row = 0; row < gridRows; row++) {
	for (let col = 0; col < gridColumns; col++) {
		cells.push({
			row: row,
			col: col,
			x: col * colSize,
			y: row * rowSize
		});
	}
}

let listItems = gsap.utils.toArray(".box").sort(() => 0.5 - Math.random()); // Randomize list items
let sortables = listItems.map(Sortable); // Array of sortables

gsap.to(container, { autoAlpha: 1, duration: 0.5 });

function changeIndex(item, to, sameRow, sameCol) {
	// Check if adjacent to new position
	if ((sameRow && !sameCol) || (!sameRow && sameCol)) {
		// Swap positions in array
		var temp = sortables[to];
		sortables[to] = item;
		sortables[item.index] = temp;
	} else {
		// Change position in array
		arrayMove(sortables, item.index, to);
	}

	// Simple, but not optimized way to change element's position in DOM. Not always necessary.
	sortables.forEach((sortable) => container.appendChild(sortable.element));

	// Set index for each sortable
	sortables.forEach((sortable, index) => sortable.setIndex(index));
}

function Sortable(element, index) {
	let content = element.querySelector(".box-content");

	let animation = gsap.to(content, {
		duration: 0.3,
		boxShadow: "rgba(0,0,0,0.8) 0px 16px 32px 0px",
		force3D: true,
		scale: 1.1,
		paused: true
	});

	let dragger = new Draggable(element, {
		onDragStart: downAction,
		onRelease: upAction,
		onDrag: dragAction
	});

	// let position = element._gsTransform;
	let getProp = gsap.getProperty(element);

	// Public properties and methods
	let sortable = {
		cell: cells[index],
		dragger: dragger,
		element: element,
		index: index,
		setIndex: setIndex
	};

	gsap.set(element, {
		x: sortable.cell.x,
		y: sortable.cell.y
	});

	function setIndex(index) {
		let cell = cells[index];
		// var dirty = position.x !== cell.x || position.y !== cell.y;
		let dirty = getProp("x") !== cell.x || getProp("y") !== cell.y;

		sortable.cell = cell;
		sortable.index = index;

		// Don't layout if you're dragging
		if (!dragger.isDragging && dirty) layout();
	}

	function downAction() {
		animation.play();
		this.update();
	}

	function dragAction() {
		let col = clampCol(Math.round(this.x / colSize));
		let row = clampRow(Math.round(this.y / rowSize));

		let cell = sortable.cell;
		let sameCol = col === cell.col;
		let sameRow = row === cell.row;

		// Check if position has changed
		if (!sameRow || !sameCol) {
			// Calculate the new index
			var index = gridColumns * row + col;

			// Update the model
			changeIndex(sortable, index, sameRow, sameCol);
		}
	}

	function upAction() {
		animation.reverse();
		layout();
	}

	function layout() {
		gsap.to(element, {
			duration: 0.3,
			x: sortable.cell.x,
			y: sortable.cell.y
		});
	}

	return sortable;
}

// Changes an elements's position in array
function arrayMove(array, from, to) {
	array.splice(to, 0, array.splice(from, 1)[0]);
}