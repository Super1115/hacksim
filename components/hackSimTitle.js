import figlet from "figlet";
import chalk from "chalk";
import gradient from "gradient-string";

// Function to display a colorful pixel-art style title
const hackSimTitle = () => {
    figlet.text(
        "HACKSIM",
        {
            font: "Chunky", // Try "ANSI Shadow", "Big", or "Block" for variation
            horizontalLayout: "full",
            verticalLayout: "full"
        },
        (err, data) => {
            if (err) {
                console.log(chalk.red("Error rendering the title!"));
                return;
            }

            // Applying gradient colors inside the text to match the logo
            const gradientTitle = gradient([
                "#FF007F",  // Magenta (top left from logo)
                "#FFD700",  // Yellow (for bright highlights)
                "#00BABA"   // Teal (for lower half of logo)
            ]);

            // Displaying the gradient-colored text
            console.log(gradientTitle.multiline(data));
        }
    );
};

export default hackSimTitle;