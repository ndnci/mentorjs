# MentorJS

JavaScript user guiding and tutorial library

## Demo

[https://ndnci.github.io/mentorjs/](https://ndnci.github.io/mentorjs/)

## Dependencies

No dependencies

## Installation

Download from ![](https://i.stack.imgur.com/gL9dG.png)

Extract js and css
```html
...
	<link rel="stylesheet" href="mentor.css">
</head>
...
	<script src="mentor.js"></script>
</body>
```

## Usage

```javascript
new MentorJS().steps([
                {
                    title: "Hello World !",
                    message: "Your message",
                }]);
```

## Settings

| Name | Parameters | Default | Description
| ------------- | --------------- | ------------- | ------------- |
| autoRun | true, false | true | By default script run automatically
| stepFrom | step index | 0  | Any existing step

## Options

| Name | Parameters | Default | Description
| ------------- | ------------ | ------------- | ------------- |
| theme | dark, light | light
| animation | zoom, pulse, bounce, toLeft, toRight, toTop, toBottom | null
| backgroundArea | any selector | document.querySelector("body")
| backgroundEffectClass | any classname | mentor-blur
| targetNoEffectClass | any classname | mentor-noblur
| targetToggleClass | any classname | mentor-toggle
| modalDivClass | any classname | mentor-modal
| modalDivHeaderClass | any classname | mentor-modal-header
| modalDivHeaderCloseClass | any classname | close
| modalDivBodyClass | any classname | mentor-modal-body
| modalDivFooterClass | any classname | mentor-modal-footer
| previousButtonClass | any classname | mentor-btn mentor-modal-previous
| nextButtonClass | any classname | mentor-btn mentor-modal-next
| endButtonClass | any classname | mentor-btn mentor-modal-end
| autoScroll | true, false | true
| scrollMethod | scrollIntoView, scrollTo | scrollTo
| scrollOn | target, modal | modal
| scrollBehavior | auto, smooth | smooth
| scrollBlock | start, center, end, nearest | center
| scrollInline | start, center, end, nearest | center
| openButtonId | any unique id | null | Must be unique for each step
| closeButtonId | any id | modalClose | Close current step
| previousButtonText | text | &laquo; Back | Allow HTML
| nextButtonText | text | Next &raquo; | Allow HTML
| endButtonText | text | Thanks
| order | number | null | Order of step
| title | text | null | Allow HTML
| message | text | null | Allow HTML
| target | any selector | null | Example "#test", or ".test"
| closeButton | true, false | false | Close button on header
| showHeader | true, false | true
| showFooter | true, false | true
| showArrow | true, false | true
| outsideClick | true, false | false | Detect outside click for close modal
| targetAutoShow | true, false | false | If target is hidden by default, you can set it to true
| margin | number | 10 | Space between modal and target, only number, max 10 recommended
| horizontal | left, center, right, auto | auto
| vertical | top, center, bottom, auto | auto
| responsive | true, false | true
| wait | time ( ms ) | 0 | Wait time ( for actual modal ) when user click to next or previous button default is 0 for modal speed
| events | javascript events | click | You can define events with space " " for listener function, for exemple : "click touchstart"
| mobileSupport | true, false | true

## Functions

| Name | Description
| ------------- | ------------------------------ |
| run() | Run script if autoRun is disabled
| goToStep() | Go to specific step
| backStep() | Go to previous step
| nextStep() | Go to next step

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
