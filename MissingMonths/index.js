const moment = require("moment");
module.exports = async function (context, req) {
  console.log(context.query);
  console.log(context.req.query);
  console.log(req.query);
  context.log("JavaScript HTTP trigger function processed a request.");

  //   if (req.query.name || (req.body && req.body.name)) {
  //     context.res = {
  //       // status: 200, /* Defaults to 200 */
  //       body: "Hello " + (req.query.name || req.body.name),
  //     };
  //   } else {
  //     context.res = {
  //       status: 400,
  //       body: "Please pass a name on the query string or in the request body",
  //     };
  //   }

  const mon = context.bindingData.month;
  return context.res.status(200).json({
    before: moment()
      .add(mon - 1, "months")
      .format("MMMM"),
    current: moment().add(mon, "months").format("MMMM"),
    after: moment()
      .add(mon + 1, "months")
      .format("MMMM"),
  });
};
