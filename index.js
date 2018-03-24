const regedit = require("regedit");

const valuesToPut = value => ({
  "HKCU\\Environment": {
    HOME: {
      value,
      type: "REG_EXPAND_SZ"
    }
  }
});

const setRegValue = value => {
  regedit.putValue(valuesToPut(value), err => {
    if (err) {
      console.log("ERROR", err);
    } else {
      console.log("Home var is set!");
    }
  });
};

module.exports = function(vorpal) {
  vorpal
    .command("set-home <value>")
    .description("Set the HOME environment variable")
    .action(function(args, callback) {
      setRegValue(args.value);
      callback();
    });
};
