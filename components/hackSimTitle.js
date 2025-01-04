import figlet from "figlet";

const hackSimTitle =  ()=>{figlet.text(
    "HackSim CLI",
    {
      font: "Chunky",
      horizontalLayout: "full",
      verticalLayout: "full",
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