import figlet from "figlet";

const hackSimTitle =  ()=>{figlet.text(
    "HackSim",
    {
      font: "Chunky",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    },
    function (err, data) {
      if (err) {
        console.log("Something went wrong rendering title...");
        console.dir(err);
        return;
      }
      console.log(data);
    }
  );
}

export default hackSimTitle;