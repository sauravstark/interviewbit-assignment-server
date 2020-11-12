const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    let sql =
    `CREATE TABLE participants (
        id INT AUTO_INCREMENT,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        phone CHAR(10),
        company VARCHAR(255),
        PRIMARY KEY (id)
    )`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("participants table created");
    });

    sql =
    `CREATE TABLE interviews (
        id INT AUTO_INCREMENT,
        company VARCHAR(255),
        start_time DATETIME,
        end_time DATETIME,
        place VARCHAR(255),
        position VARCHAR(255),
        PRIMARY KEY (id)
    )`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("interviews table created");
    });

    sql =
    `CREATE TABLE interview_participant (
        id INT AUTO_INCREMENT,
        interview_id INT,
        participant_id INT,
        role VARCHAR(255),
        PRIMARY KEY (id),
        FOREIGN KEY (interview_id) REFERENCES interviews(id),
        FOREIGN KEY (participant_id) REFERENCES participants(id)
    )`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("interview_participant table created");
    });

    sql =
    `INSERT INTO participants 
        (name, email, phone, company)
        VALUES
        ( "Mira Mack", "eros.Proin.ultrices@Duisami.net", "4807850288", "Facebook" ),
        ( "Ella Bean", "id.magna@risusDuis.co.uk", "1151799015", "Microsoft" ),
        ( "Kane Walker", "adipiscing@asollicitudin.org", "9762425829", "Delhi Technological University" ),
        ( "Aspen Mccormick", "condimentum.eget.volutpat@sapien.org", "5890161822", "Birla Institute of Technology and Science" ),
        ( "Alden Crane", "sociis@Integertinciduntaliquam.net", "1504466668", "Delhi Technological University" ),
        ( "Idola Mcclure", "placerat.Cras.dictum@ultricies.org", "2675377239", "Thapar Institute of Engineering and Technology" ),
        ( "Sasha Malone", "vulputate.mauris.sagittis@atsem.com", "5530021867", "Jaypee Institute of Information Technology" ),
        ( "Nayda Reyes", "pretium.aliquet.metus@semelitpharetra.ca", "7226770031", "Microsoft" ),
        ( "Flavia Doyle", "ante@metusIn.edu", "5335482805", "Delhi Technological University" ),
        ( "Raja Weiss", "Sed.et.libero@ornarelectusante.ca", "5788782646", "Microsoft" ),
        ( "Kirsten Payne", "sodales.elit.erat@porttitortellusnon.com", "2048761523", "Microsoft" ),
        ( "Vivien Mcmahon", "tempus.non.lacinia@Phasellusnulla.net", "6829469397", "Delhi Technological University" ),
        ( "Chiquita Leblanc", "ligula@imperdietdictum.com", "5996780061", "Microsoft" ),
        ( "Xavier Clements", "Aenean.massa@elit.ca", "8816089568", "Jaypee Institute of Information Technology" ),
        ( "Louis Knox", "arcu.eu.odio@amagna.edu", "0114429989", "Delhi Technological University" ),
        ( "Megan Sexton", "aliquet.lobortis.nisi@utlacusNulla.net", "9046132289", "Birla Institute of Technology and Science" ),
        ( "Jasmine Young", "Vivamus.nisi.Mauris@Aeneanegetmetus.com", "9875673511", "Amazon" ),
        ( "Lani Mckay", "sollicitudin@molestie.org", "7455047168", "Jaypee Institute of Information Technology" ),
        ( "Amelia Kemp", "nibh.Donec.est@Morbiaccumsanlaoreet.edu", "3286977452", "Goldman Sachs" ),
        ( "Hedwig Haley", "eu.ultrices@quamCurabiturvel.ca", "8935485817", "Delhi Technological University" ),
        ( "Xavier Mcpherson", "Nulla@tincidunttempusrisus.co.uk", "3473330960", "Thapar Institute of Engineering and Technology" ),
        ( "Yoko Adams", "diam.nunc.ullamcorper@nonlaciniaat.com", "3856705103", "Microsoft" ),
        ( "Morgan Duke", "Integer.vitae.nibh@dolorsitamet.org", "7967768540", "Microsoft" ),
        ( "Lacy Michael", "aptent@egetvarius.org", "5246277104", "Vellore Institute of Technology" ),
        ( "Dylan Hansen", "Duis.elementum.dui@faucibusidlibero.ca", "3127449185", "Delhi Technological University" ),
        ( "Kevin Clay", "libero@eu.edu", "9117072954", "Jaypee Institute of Information Technology" ),
        ( "Wyatt Graham", "aliquam@mauris.ca", "7708997691", "Goldman Sachs" ),
        ( "Halee Monroe", "Donec.at.arcu@lacusQuisqueimperdiet.ca", "6250921698", "Goldman Sachs" ),
        ( "Oleg Ortiz", "ut.pellentesque@vitae.net", "3679886945", "Facebook" ),
        ( "Nora Lancaster", "Aliquam.tincidunt.nunc@mus.co.uk", "4779046962", "Jaypee Institute of Information Technology" ),
        ( "Jakeem Coleman", "eget.ipsum.Donec@malesuadavel.com", "6291487644", "Delhi Technological University" ),
        ( "Isaac Mccall", "eget.massa.Suspendisse@id.co.uk", "5707365364", "Thapar Institute of Engineering and Technology" ),
        ( "Oprah Dillon", "erat.nonummy.ultricies@Nuncquisarcu.com", "1717253899", "Vellore Institute of Technology" ),
        ( "Oliver Nelson", "fringilla@Nullamnisl.co.uk", "7608204657", "Vellore Institute of Technology" ),
        ( "Clayton Meyer", "ornare.libero@Pellentesqueultricies.co.uk", "3320003328", "Jaypee Institute of Information Technology" ),
        ( "Leilani Wynn", "Quisque.tincidunt@ridiculusmus.net", "2508355278", "Thapar Institute of Engineering and Technology" ),
        ( "Karly Kirk", "varius.et@euismodurnaNullam.com", "9715718210", "Microsoft" ),
        ( "Barry Stein", "mattis.ornare@consequat.com", "5844688448", "Amazon" ),
        ( "Silas Wilcox", "dui@laoreet.net", "2021910251", "Goldman Sachs" ),
        ( "Ursa Short", "egestas.urna@ligulaconsectetuerrhoncus.net", "0476855088", "Facebook" ),
        ( "Theodore Reyes", "pede@acrisus.co.uk", "0853283517", "Vellore Institute of Technology" ),
        ( "Sophia Patton", "Sed.diam@elitEtiam.com", "0268121067", "Birla Institute of Technology and Science" ),
        ( "Charles Brown", "Sed.et@nonlorem.com", "5915830588", "Facebook" ),
        ( "Candace Everett", "mollis.Integer.tincidunt@sociosquad.ca", "5363682807", "Amazon" ),
        ( "Isadora Baker", "mauris.aliquam@vulputateullamcorper.net", "7015196613", "Birla Institute of Technology and Science" ),
        ( "Jemima Wright", "magna.tellus.faucibus@porttitorinterdumSed.ca", "3547734967", "Microsoft" ),
        ( "Evelyn Hale", "Fusce.fermentum@magna.co.uk", "2174050961", "Jaypee Institute of Information Technology" ),
        ( "Hyatt Hewitt", "consectetuer@eu.ca", "4610646171", "Amazon" ),
        ( "Leandra Clay", "pede.sagittis.augue@scelerisqueduiSuspendisse.ca", "0640314850", "Thapar Institute of Engineering and Technology" ),
        ( "Dieter Foster", "vel.est.tempor@mollisvitaeposuere.com", "2258437077", "Delhi Technological University" ),
        ( "Cara Landry", "a@a.co.uk", "0550498115", "Delhi Technological University" ),
        ( "Maxwell Valentine", "Donec.egestas.Aliquam@loremeu.org", "4916367147", "Thapar Institute of Engineering and Technology" ),
        ( "Kato Prince", "sit@felis.ca", "0077625851", "Amazon" ),
        ( "Grant Rivas", "tempus.risus.Donec@ornarefacilisiseget.co.uk", "8242057009", "Jaypee Institute of Information Technology" ),
        ( "Benedict Clarke", "dictum.eu@lobortisquam.org", "3919039219", "Jaypee Institute of Information Technology" ),
        ( "Rooney Weiss", "aliquam@euultricessit.ca", "4046961397", "Goldman Sachs" ),
        ( "Lilah Torres", "Aenean@ultricies.co.uk", "2429077122", "Jaypee Institute of Information Technology" ),
        ( "Josephine Mack", "eu.placerat@malesuadaIntegerid.org", "2841206743", "Vellore Institute of Technology" ),
        ( "Thane Cox", "enim.mi.tempor@sitametultricies.net", "7053866871", "Facebook" ),
        ( "Lacy Holman", "tortor.at.risus@Nullamvelitdui.net", "8675757922", "Microsoft" ),
        ( "Jena Brock", "tincidunt.nunc.ac@ultricesiaculis.org", "5444741741", "Microsoft" ),
        ( "Macon Davidson", "Curabitur@ProinmiAliquam.edu", "2367209710", "Vellore Institute of Technology" ),
        ( "Dean Berry", "magna.Suspendisse.tristique@eusemPellentesque.co.uk", "5031660392", "Amazon" ),
        ( "Jesse Watts", "Fusce.fermentum.fermentum@Nulla.co.uk", "8126980910", "Goldman Sachs" ),
        ( "Erich Medina", "Curabitur.sed.tortor@Donec.co.uk", "9356314732", "Thapar Institute of Engineering and Technology" ),
        ( "Aretha Landry", "a.neque.Nullam@Phasellusdolorelit.ca", "4314627705", "Amazon" ),
        ( "Tyrone Chang", "diam@tinciduntduiaugue.co.uk", "9951579382", "Google" ),
        ( "Octavius Hartman", "Maecenas@egetodio.com", "3686480924", "Delhi Technological University" ),
        ( "Hoyt Young", "euismod.in@fringillaporttitor.com", "0679699639", "Amazon" ),
        ( "Jeremy Gregory", "turpis.non@vitae.org", "8053637741", "Amazon" ),
        ( "Charles Mills", "et.risus.Quisque@inceptoshymenaeos.net", "0689940130", "Goldman Sachs" ),
        ( "Sydnee Medina", "ultrices@Duis.co.uk", "1521327299", "Thapar Institute of Engineering and Technology" ),
        ( "Amela Mercado", "volutpat.ornare.facilisis@ultricesposuere.com", "8766269144", "Vellore Institute of Technology" ),
        ( "Claudia Tyler", "enim@diamSeddiam.co.uk", "2062272334", "Vellore Institute of Technology" ),
        ( "Jena Douglas", "bibendum.Donec.felis@estmollisnon.net", "4688341893", "Thapar Institute of Engineering and Technology" ),
        ( "Tatum Gentry", "orci.sem.eget@elementumsem.ca", "5806841626", "Facebook" ),
        ( "Kane Wolf", "sit.amet@velit.com", "1830051204", "Jaypee Institute of Information Technology" ),
        ( "Cain Hull", "Quisque@arcuetpede.net", "3335923448", "Goldman Sachs" ),
        ( "Allistair Pace", "nibh@justo.org", "5944145444", "Birla Institute of Technology and Science" ),
        ( "Burke Cherry", "ante.dictum.mi@incursus.ca", "1832019234", "Jaypee Institute of Information Technology" ),
        ( "Diana Bates", "tempor.bibendum.Donec@facilisisfacilisis.net", "3367247908", "Vellore Institute of Technology" ),
        ( "Rafael Atkins", "velit.justo@congueelit.co.uk", "5476067569", "Jaypee Institute of Information Technology" ),
        ( "Aurelia Campos", "ridiculus.mus.Proin@vehiculaet.org", "5859378265", "Thapar Institute of Engineering and Technology" ),
        ( "Minerva Zimmerman", "Phasellus@Phasellusat.ca", "2310633293", "Amazon" ),
        ( "Martin Moss", "non@tellusfaucibus.edu", "4850592833", "Google" ),
        ( "Odysseus Valenzuela", "erat@ornareInfaucibus.co.uk", "0065724055", "Microsoft" ),
        ( "Mufutau Estes", "ultrices.mauris@nullaInteger.edu", "5897990510", "Goldman Sachs" ),
        ( "Chadwick Spence", "neque@orcilacusvestibulum.net", "3235348276", "Thapar Institute of Engineering and Technology" ),
        ( "Zorita Becker", "lectus.justo@nonvestibulumnec.ca", "9565883967", "Facebook" ),
        ( "Ryder Golden", "egestas.a@Duis.net", "0778743478", "Microsoft" ),
        ( "Merritt Hale", "Ut.semper@Nullainterdum.co.uk", "9941750513", "Microsoft" ),
        ( "Alec Silva", "Curabitur@nasceturridiculusmus.org", "7962205989", "Vellore Institute of Technology" ),
        ( "Montana Livingston", "elit.pretium.et@nequevitaesemper.org", "9444793927", "Microsoft" ),
        ( "Audra Bell", "nonummy.Fusce@Phaselluselitpede.edu", "7701469017", "Delhi Technological University" ),
        ( "Ulric Sutton", "eros.nec@aliquam.net", "4508969899", "Goldman Sachs" ),
        ( "Shana Hamilton", "et.magna@Suspendissedui.org", "8529227825", "Vellore Institute of Technology" ),
        ( "Isadora Stevens", "gravida.non@commodoatlibero.net", "6137011942", "Jaypee Institute of Information Technology" ),
        ( "Cameron Haney", "magna.malesuada.vel@sit.org", "2977599141", "Google" ),
        ( "Clayton Gentry", "ut.erat.Sed@Loremipsum.org", "4624743894", "Microsoft" ),
        ( "Graham Case", "Curabitur@Donectempor.net", "0012904075", "Goldman Sachs" )
    `;    
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("participants added");
    });

    sql =
    `INSERT INTO interviews 
        (company, start_time, end_time, place, position)
        VALUES
        ( "Facebook", "2020-11-12 16:00:00", "2020-11-12 17:00:00", "Online", "SDE Internship" ),
        ( "Microsoft", "2020-11-10 19:30:00", "2020-11-10 19:50:00", "Hyderbad", "SDE 1" ),
        ( "Amazon", "2020-11-06 10:00:00", "2020-11-06 11:00:00", "Online", "SDE Internship" ),
        ( "Google", "2020-11-06 14:00:00", "2020-11-06 15:00:00", "Pune", "SDE 2" )
    `;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("interviews added");
    });

    sql =
    `INSERT INTO interview_participant 
        (participant_id, interview_id, role)
        VALUES
        ( 1, 1, "interviewer" ),
        ( 29, 1, "interviewer" ),
        ( 16, 1, "interviewee" ),
        ( 10, 2, "interviewer" ),
        ( 86, 2, "interviewer" ),
        ( 97, 2, "interviewee" ),
        ( 17, 3, "interviewer" ),
        ( 21, 3, "interviewee" ),
        ( 67, 4, "interviewer" ),
        ( 85, 4, "interviewer" ),
        ( 98, 4, "interviewer" ),
        ( 81, 4, "interviewee" )
    `;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("interview participants added");
    });
});