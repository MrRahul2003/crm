const pdfgen = async (req, res) => {
    try {
      console.log(__dirname, req.body, req.body.enquiryInfo.itemList);
      var itemList = req.body.enquiryInfo.itemList;
  
      const browser = await puppeteer.launch({ headless: "new" });
      const [page] = await browser.pages();
  
      // await page.goto('https://developer.chrome.com/');
      const filePathName = path.join(__dirname, "/routes/views", "/genpdf.ejs");
  
      const html = await ejs.renderFile(filePathName, {
        itemList: itemList,
        EnquiryData: req.body.EnquiryInfo,
      });
      await page.setContent(html);
  
      // create a new pdf document
      const pdf = await page.pdf({
        path: "./pdf/enquirypdf.pdf",
        format: "A4",
        printBackground: true,
        margin: {
          top: "0.3in",
          right: "0.3in",
          bottom: "0.3in",
          left: "0.3in",
        },
      });
      res.contentType("application/pdf");
  
      console.log("file created successfully");
      res.status(200).send("File created successfully");
  
      browser.close();
    } catch (error) {
      console.log(error.message);
      return res.status(500).json(error.message);
    }
  };



  
const pdfgen = async (req, res) => {
  try {
    console.log(__dirname, req.body, req.body.enquiryInfo.itemList);
    var itemList = req.body.enquiryInfo.itemList;

    if (itemList.length === 0) {
      console.log("0", "no itemList found");
      res.status(500).send("no itemList found");
    } else {
      ejs.renderFile(
        path.join(__dirname, "/routes/views", "/genpdf.ejs"),
        {
          itemList: itemList,
          EnquiryData: req.body.EnquiryInfo,
        },
        (err, data) => {
          if (err) {
            console.log("1", err);
            res.status(500).send(err);
          } else {
            let options = {
              childProcessOptions: {
                env: {
                  OPENSSL_CONF: "/dev/null",
                },
              },
              "format": "A4",
              "orientation": "portrait",
              remarkable: {
                html: true
              },
              "border": {
                "top": "0.3in",
                "right": "0.3in",
                "bottom": "0.3in",
                "left": "0.3in"
              },
            };
            pdf
              .create(data, options)
              .toFile("./pdf/enquirypdf.pdf", function (err, data) {
                if (err) {
                  console.log("2", err);
                  res.status(500).send(err);
                } else {
                  console.log("file created successfully");
                  res.status(200).send("File created successfully");
                }
              });
          }
        }
      );
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};


npm i -S puppeteer@2.1.1