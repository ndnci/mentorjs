import MentorJS from "./../lib";

class App {
    constructor() {
        this.run();
    }

    run = () => {
        window.addEventListener("load", function () {
            new MentorJS({
                animation: "zoom",
            }).steps([
                {
                    title: "Hello World !",
                    message: "I have not target because my configuration is simple !",
                },
                {
                    animation: "toRight",
                    target: "#step1",
                    message: "I can change animation and remove my title",
                },
                {
                    target: "#step2",
                    message: "I'm responsive, find my position is easy for me",
                },
                {
                    target: "#step1",
                    title: "Forget something ?",
                    message: "You can use the same target for multiple steps",
                },
                {
                    targetAutoShow: true,
                    target: "#step3",
                    message: "I can show hidden elements !",
                },
                {
                    target: "#step4",
                    message: "Auto scroll ? No problem !",
                },
                {
                    theme: "dark",
                    animation: "bounce",
                    closeButton: true,
                    outsideClick: true,
                    target: "#step5",
                    title: "Thank you !",
                    message: "Different animation and theme, you can also click outside for close this modal",
                },
            ]);
        });
    };
}

export default App;
