/**
 * Created by mindestens on 12/26/13.
 */
generateOffersPdf = function (offers) {
  // main pdf settings
  var pdf = new jsPDF('l', 'in', 'a4'),
    size = 7,
    font = ['Helvetica', ''];

  // variables for counting inside of the forEach loop
  var countOfferOnPage = 0,
    countPage = 0;

  // offset variables
  var offerOffsetX = [0, 5.85, 0, 5.85],
    offerOffsetY = [0, 0, 4.14, 4.14];

  offers.forEach(function (offer) {
    // debugging information
    //console.log("Rendering Offer " + countOfferOnPage + " on page " + countPage);
    //console.log("offerOffsetX: " + offerOffsetX[countOfferOnPage]);
    //console.log("offerOffsetY: " + offerOffsetY[countOfferOnPage]);

    var verticalOffset = 0.5, // inches
      offerContent = offer.content;


    // main layout objects
    pdf.setLineWidth(0.01);
    // outer box
    // TODO: make color pickable by the user
    pdf.setFillColor(0xCF, 0xDD, 0x88);
    pdf.rect(0.23 + offerOffsetX[countOfferOnPage], 0.23 + offerOffsetY[countOfferOnPage], 5.37, 3.67, "F");
    // text box
    pdf.setFillColor(0xFF, 0xFF, 0xFF);
    pdf.rect(2.85 + offerOffsetX[countOfferOnPage], 0.45 + offerOffsetY[countOfferOnPage], 2.5, 3.23, "F");
    // address box
    pdf.rect(0.6 + offerOffsetX[countOfferOnPage], 2.1 + offerOffsetY[countOfferOnPage], 2.16, 1.57, "F");
    // image box
    pdf.setFillColor(0xDD, 0xDD, 0xDF);
    pdf.rect(0.6 + offerOffsetX[countOfferOnPage], 0.45 + offerOffsetY[countOfferOnPage], 2.16, 1.57, "F");
    // text Minuto Angebotskarte
    pdf.setFontSize(12);
    pdf.setFontStyle("normal");
    pdf.text("Minuto Angebotskarte", 2.08 + offerOffsetX[countOfferOnPage], 0.39 + offerOffsetY[countOfferOnPage]);
    // text © 2014 by minutocash.sinndrin.ch / Copyleft: Lizenz Freie Kunst 1.1
    pdf.setFontSize(7);
    pdf.text("© 2014 by minutocash.sinndrin.ch / Copyleft: Lizenz Freie Kunst 1.1", 1.35 + offerOffsetX[countOfferOnPage], 3.82 + offerOffsetY[countOfferOnPage]);


    if (font.hasOwnProperty(0)) {
      // printing the content with the maximum possible font size depending on the length of the field.
      // try with font size 9
      var lines = pdf.setFont(font[0], font[1])
        .setFontSize(9)
        .splitTextToSize(offerContent, 2.4);
      // font 9 = 22 lines
      if (lines.length > 21) {
        // try with font size 8
        lines = pdf.setFont(font[0], font[1])
          .setFontSize(8)
          .splitTextToSize(offerContent, 2.4);
        // font 8 = 24 lines
        if (lines.length > 23) {
          // use font size 7
          lines = pdf.setFont(font[0], font[1])
            .setFontSize(7)
            .splitTextToSize(offerContent, 2.4);
          // font 7 = 28 lines
          if (lines.length > 27) {
            lines = lines.splice(0, 27);
            // if the text is too long, crop and show hint on last line
            lines.push("! text is too long, some lines removed !".toUpperCase());
          }
        }
      }
      // print the lines
      pdf.text(2.9 + offerOffsetX[countOfferOnPage], verticalOffset + size / 72 + offerOffsetY[countOfferOnPage], lines);

      verticalOffset += (lines.length + 0.5) * size / 72;

      // Contact Fileds

      // Firstname Lastname
      // setting the proper font size for the contact fields
      var nameLength = offer.firstname.length + offer.lastname.length;
      switch (true) {
        case parseInt(nameLength, 10) > 23:
          pdf.setFontSize(6);
          break;
        case parseInt(nameLength, 10) > 19:
          pdf.setFontSize(8);
          break;
        case parseInt(nameLength, 10) > 15:
          pdf.setFontSize(10);
          break;
        default:
          pdf.setFontSize(12);
      }

      // firstname + lastname
      pdf.setFontStyle("bold");
      // check if the firstname + lastname is too long to display in the canvas
      if (parseInt(nameLength, 10) > 34) {
        var offerName = offer.firstname + " " + offer.lastname;
        var trimmedOfferName = offerName.substring(0, 31) + "...";
        pdf.text(trimmedOfferName, 0.65 + offerOffsetX[countOfferOnPage], 2.3 + offerOffsetY[countOfferOnPage]);
      } else {
        pdf.text(offer.firstname + " " + offer.lastname, 0.65 + offerOffsetX[countOfferOnPage], 2.3 + offerOffsetY[countOfferOnPage]);
      }

      // contact Free Text 1 + 2
      pdf.setFontStyle("normal");
      pdf.setFontSize(8);
      var contactOffsetY = 2.45;
      if (offer.contactFreeText1) {
        pdf.text(offer.contactFreeText1, 0.65 + offerOffsetX[countOfferOnPage], contactOffsetY + offerOffsetY[countOfferOnPage]);
        contactOffsetY += 0.14;
      }
      if (offer.contactFreeText2) {
        pdf.text(offer.contactFreeText2, 0.65 + offerOffsetX[countOfferOnPage], contactOffsetY + offerOffsetY[countOfferOnPage]);
        contactOffsetY += 0.12;
      }

      // vspace before address
      contactOffsetY += 0.07;

      // address
      if (offer.addressStreet) {
        pdf.text(offer.addressStreet, 0.65 + offerOffsetX[countOfferOnPage], contactOffsetY + offerOffsetY[countOfferOnPage]);
        contactOffsetY += 0.12;
      }
      if (offer.addressPostalCode || offer.addressLocation) {
        pdf.text(offer.addressPostalCode + " " + offer.addressLocation, 0.65 + offerOffsetX[countOfferOnPage], contactOffsetY + offerOffsetY[countOfferOnPage]);
        contactOffsetY += 0.12;
      }
      if (offer.addressCountry) {
        pdf.text(offer.addressCountry, 0.65 + offerOffsetX[countOfferOnPage], contactOffsetY + offerOffsetY[countOfferOnPage]);
        contactOffsetY += 0.12;
      }

      // vspace before phone, email and website
      contactOffsetY += 0.07;

      // phone
      if (offer.phone) {
        pdf.text(offer.phone, 0.65 + offerOffsetX[countOfferOnPage], contactOffsetY + offerOffsetY[countOfferOnPage]);
        contactOffsetY += 0.12;
      }
      // email
      if (offer.email) {
        pdf.text(offer.email, 0.65 + offerOffsetX[countOfferOnPage], contactOffsetY + offerOffsetY[countOfferOnPage]);
        contactOffsetY += 0.12;
      }
      // website
      if (offer.website) {
        pdf.text(offer.website, 0.65 + offerOffsetX[countOfferOnPage], contactOffsetY + offerOffsetY[countOfferOnPage]);
        contactOffsetY += 0.12;
      }

      // updated text, x and y pos is hardcoded to the bottom of the address box
      if (offer.updated) {
        pdf.text("Updated: " + dateText(new Date(offer.updated)), 0.65 + 1 + offerOffsetX[countOfferOnPage], 3.62 + offerOffsetY[countOfferOnPage]);
        contactOffsetY += 0.12;
      }

      // offer image (placeholder)
      var imgData = 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABGAAD/7gAOQWRvYmUAZMAAAAAB/9sAhAAEAwMDAwMEAwMEBgQDBAYHBQQEBQcIBgYHBgYICggJCQkJCAoKDAwMDAwKDAwNDQwMEREREREUFBQUFBQUFBQUAQQFBQgHCA8KCg8UDg4OFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCACCAIIDAREAAhEBAxEB/8QAeQAAAgMBAQEBAAAAAAAAAAAAAAIBAwUGBAcIAQEBAAAAAAAAAAAAAAAAAAAAARAAAgEDAQMHCgQHAQAAAAAAAAECEQMEMSFBBVFh0RIiMgZxgZGhscFSYhMjQnIzFOGCksJDNBU1EQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9dIoZAMBNAGoAUAmiAKICKAQ0ArQCtAQ0BABQCKAQA6AdIBkgGSAmgDQtynJQhFym9IpVbA18XgF2dJZUvpx+CO2XQgNS1wjAtf4uu+WbcvVoQXfscKlP29qn5I9AFF/g2BeWy39OW6UNnq0Aws7g2TiVuQ+7ZX4oralzoozGgFaAgCAIAAJQFiAdIBkgHtWp3rkbdtVnJ0igOr4fw+1g290r8u/c9y5iD2AAAAAAGBxrhUIweZjR6tNt2C0p8S95Rz7QCtAQBDAgBogWIB0AyQG/wHFSjPLktr7FvyLVkG0AAAAAAAENKScZKqexp8gHGcQxf2mVcs/gTrB/K9qKPG0AoAwFAaIFqAdaAMB1/D4K3hY8Vp1Iy88lV+0g9IAAAAAAAAHO+I7aV6xc3yi4/wBLr7yjCYCsCAACYgWIB0AwHX8Ol1sHHfyJejYQekAAAAAAAADC8SUpjcvb/tKOfaARoBQACYgWIB0B6cXGnl342INJyq6vRJKoHUYGPcxcaNi41Jwbo1vTdfeQekAAAAAAAADO4pw2Wcozhc6s7afVi1sbfPuA5WSabi9jW4orYCvUCAGiA6AsQHu4VdVrPtN6Sbg/5lResDqyAAAAAAAAAAhtRTk3RLa3zAcRfn9S7O4tJScvS6lFLARgL0gOgLEA61AaMnGSlHY06p86A7SzcV61C7HScVJedEDgAAAAAAAAeDi9/wCjgzSfaufbXn19QHKPQoRgVsBekB0BYtAGAYDW4ZxWdj6eLOKlbckoyrRxUmB0RAAAAAAAFd+9HHszvS2qCbpy8wHL5/ELudKLklCEO7Bbdd7KPCAjArkAgFqAdaAMAwEptOq1QHYYeQsnGt3lrJdr8y2P1kF4AAAAABk8dyVDHjjp9u66tfLHb7QOdKFYCMCqQCVAtW4B0A60AlASBt+H7s+tds1+3RTS5HoBukAAAAA3RNvRAcdl5M8u/O9Pf3VyRWiKKGAjASTAqkwEqBcgHQDIBkBIG54etv791rs7Ip8+rA3CAAAABbn6cvI/YBxNShWwFbArkwKpMCuoHoQDJgOmBKYHtweH382dILq2l37j0Xk5WB1OPj28a1GzaVIx9LfKyC0AAAAAaqmnvA4i9bnYuzs3FScHRooqbARsCqUgKpMBKgelMC61au3pdS1CU58kU37ANOxwHOu0d3q2Y/M6v0KoGrj8BxLVJXm70lufZj6F0kGpGEYRUIRUYrYopUSAkAAAAAAAPNl4GLmql+HaWk1skvOBg5nh/JtVljSV6Hw92fQyjFuxnbk4XIuE1rGSo/WBRKQFbYC1QG1wjh3/AEb7Um42baTuNauuiXlA7CxYs41tWrEFCC3L38pBYAAAAAAAAAAAAAAVX8XHyo9TItRuR3dZbV5HuAxcvwvjXE5YlyVme6Mu3HpA53P4TncPTlft1tVp9WD60f4ecoz6gdn4X/17+nfXl0IN4AAAAAAAAAAAAAAAAAA8nFP/ADsru/pT7/d0A+cFH//Z';
      pdf.addImage(imgData, 'JPEG', (2.16 - 1.57) / 2 + 0.6 + offerOffsetX[countOfferOnPage], 0.45 + offerOffsetY[countOfferOnPage], 1.57, 1.57);

      // setting counters
      if (countOfferOnPage < 3) {
        countOfferOnPage += 1;
      } else {
        countOfferOnPage = 0;
        countPage += 1;
        pdf.addPage();
      }
    }
  });
  // deliver document
  pdf.output('datauri');
};