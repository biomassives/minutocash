/**
 * Created by mindestens on 12/26/13.
 */
generateOfferPdf = function (offer) {
  var pdf = new jsPDF('l', 'in', 'a4')
    , size = 7
    , font = ['Helvetica', '']
    , font, size, lines
    , verticalOffset = 0.5 // inches
    , loremipsum = offer.content


// main layout objects
  pdf.setLineWidth(0.01);
// outer box
// TODO: make color pickable by the user
  pdf.setFillColor(0xCF, 0xDD, 0x88);
  pdf.rect(0.23, 0.23, 5.37, 3.67, "F");
// text box
  pdf.setFillColor(0xFF, 0xFF, 0xFF);
  pdf.rect(2.85, 0.45, 2.5, 3.23, "F");
// address box
  pdf.rect(0.6, 2.1, 2.16, 1.57, "F");
// image box
  pdf.setFillColor(0xDD, 0xDD, 0xDF);
  pdf.rect(0.6, 0.45, 2.16, 1.57, "F");
// text Minuto Angebotskarte
  pdf.setFontSize(12);
  pdf.setFontStyle("normal");
  pdf.text("Minuto Angebotskarte", 2.08, 0.39);
// text © 2014 by minutocash.sinndrin.ch / Copyleft: Lizenz Freie Kunst 1.1
  pdf.setFontSize(7);
  pdf.text("© 2014 by minutocash.sinndrin.ch / Copyleft: Lizenz Freie Kunst 1.1", 1.35, 3.82);


  if (font.hasOwnProperty(0)) {
    var lines = pdf.setFont(font[0], font[1])
      .setFontSize(size)
      .splitTextToSize(loremipsum, 2.4)
    // Don't want to preset font, size to calculate the lines?
    // .splitTextToSize(text, maxsize, options)
    // allows you to pass an object with any of the following:
    // {
    // 	'fontSize': 12
    // 	, 'fontStyle': 'Italic'
    // 	, 'fontName': 'Times'
    // }
    // Without these, .splitTextToSize will use current / default
    // font Family, Style, Size.

    // if the text is too long, crop and show hint on last line
    if (lines.length > 27) {
      lines = lines.splice(0, 27);
      //console.log(lines);
      lines.push("! text is too long, some lines removed !".toUpperCase());
      //console.log(lines);
    }

    pdf.text(2.9, verticalOffset + size / 72, lines)

    verticalOffset += (lines.length + 0.5) * size / 72
  }


//console.log(jsPDF.getFontList());

// Contact Fileds
// Firstname Lastname
  pdf.setFontSize(12);
  pdf.setFontStyle("bold");
  pdf.text(offer.firstname + " " + offer.lastname, 0.65, 2.3);
// offer image (placeholder)
  var imgData = 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABGAAD/7gAOQWRvYmUAZMAAAAAB/9sAhAAEAwMDAwMEAwMEBgQDBAYHBQQEBQcIBgYHBgYICggJCQkJCAoKDAwMDAwKDAwNDQwMEREREREUFBQUFBQUFBQUAQQFBQgHCA8KCg8UDg4OFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCACCAIIDAREAAhEBAxEB/8QAeQAAAgMBAQEBAAAAAAAAAAAAAAIBAwUGBAcIAQEBAAAAAAAAAAAAAAAAAAAAARAAAgEDAQMHCgQHAQAAAAAAAAECEQMEMSFBBVFh0RIiMgZxgZGhscFSYhMjQnIzFOGCksJDNBU1EQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9dIoZAMBNAGoAUAmiAKICKAQ0ArQCtAQ0BABQCKAQA6AdIBkgGSAmgDQtynJQhFym9IpVbA18XgF2dJZUvpx+CO2XQgNS1wjAtf4uu+WbcvVoQXfscKlP29qn5I9AFF/g2BeWy39OW6UNnq0Aws7g2TiVuQ+7ZX4oralzoozGgFaAgCAIAAJQFiAdIBkgHtWp3rkbdtVnJ0igOr4fw+1g290r8u/c9y5iD2AAAAAAGBxrhUIweZjR6tNt2C0p8S95Rz7QCtAQBDAgBogWIB0AyQG/wHFSjPLktr7FvyLVkG0AAAAAAAENKScZKqexp8gHGcQxf2mVcs/gTrB/K9qKPG0AoAwFAaIFqAdaAMB1/D4K3hY8Vp1Iy88lV+0g9IAAAAAAAAHO+I7aV6xc3yi4/wBLr7yjCYCsCAACYgWIB0AwHX8Ol1sHHfyJejYQekAAAAAAAADC8SUpjcvb/tKOfaARoBQACYgWIB0B6cXGnl342INJyq6vRJKoHUYGPcxcaNi41Jwbo1vTdfeQekAAAAAAAADO4pw2Wcozhc6s7afVi1sbfPuA5WSabi9jW4orYCvUCAGiA6AsQHu4VdVrPtN6Sbg/5lResDqyAAAAAAAAAAhtRTk3RLa3zAcRfn9S7O4tJScvS6lFLARgL0gOgLEA61AaMnGSlHY06p86A7SzcV61C7HScVJedEDgAAAAAAAAeDi9/wCjgzSfaufbXn19QHKPQoRgVsBekB0BYtAGAYDW4ZxWdj6eLOKlbckoyrRxUmB0RAAAAAAAFd+9HHszvS2qCbpy8wHL5/ELudKLklCEO7Bbdd7KPCAjArkAgFqAdaAMAwEptOq1QHYYeQsnGt3lrJdr8y2P1kF4AAAAABk8dyVDHjjp9u66tfLHb7QOdKFYCMCqQCVAtW4B0A60AlASBt+H7s+tds1+3RTS5HoBukAAAAA3RNvRAcdl5M8u/O9Pf3VyRWiKKGAjASTAqkwEqBcgHQDIBkBIG54etv791rs7Ip8+rA3CAAAABbn6cvI/YBxNShWwFbArkwKpMCuoHoQDJgOmBKYHtweH382dILq2l37j0Xk5WB1OPj28a1GzaVIx9LfKyC0AAAAAaqmnvA4i9bnYuzs3FScHRooqbARsCqUgKpMBKgelMC61au3pdS1CU58kU37ANOxwHOu0d3q2Y/M6v0KoGrj8BxLVJXm70lufZj6F0kGpGEYRUIRUYrYopUSAkAAAAAAAPNl4GLmql+HaWk1skvOBg5nh/JtVljSV6Hw92fQyjFuxnbk4XIuE1rGSo/WBRKQFbYC1QG1wjh3/AEb7Um42baTuNauuiXlA7CxYs41tWrEFCC3L38pBYAAAAAAAAAAAAAAVX8XHyo9TItRuR3dZbV5HuAxcvwvjXE5YlyVme6Mu3HpA53P4TncPTlft1tVp9WD60f4ecoz6gdn4X/17+nfXl0IN4AAAAAAAAAAAAAAAAAA8nFP/ADsru/pT7/d0A+cFH//Z';
  pdf.addImage(imgData, 'JPEG', (2.16 - 1.57) / 2 + 0.6, 0.45, 1.57, 1.57);

  pdf.output('datauri');
};