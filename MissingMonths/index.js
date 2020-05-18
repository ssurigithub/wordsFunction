const moment = require("moment");
const uuid = require("uuid");
module.exports = async function (context, req) {
  console.log(context.query);
  console.log(context.req.query);
  console.log(req.query);
  context.log("JavaScript HTTP trigger function processed a request.");

  const mon = context.bindingData.month;
  var data = getResult(mon);
  console.log(
    `words/months was invoked with the param ${mon} and the response is ${JSON.stringify(
      data
    )}`
  );

  context.bindings.msg = `words/months was invoked with the param ${mon} and the response is ${JSON.stringify(
    data
  )}`;
  context.bindings.tableLogs = [];
  context.bindings.tableLogs.push({
    PartitionKey: "Words_Months",
    RowKey: uuid.v4(),
    input: mon,
    result: JSON.stringify(data),
  });
  return context.res.status(200).json(data);
};

function getResult(mon) {
  var data = {
    before: moment()
      .add(mon - 1, "months")
      .format("MMMM"),
    current: moment().add(mon, "months").format("MMMM"),
    after: moment()
      .add(mon + 1, "months")
      .format("MMMM"),
  };
  return data;
}
