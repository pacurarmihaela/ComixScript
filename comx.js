const { MongoClient } = require('mongodb');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');



async function generateComicData(comicId, title, publisher, author, genre, posterLink, numIssues, seriesLink) {
    const comicData = {
        comicId: String(comicId),
        title: title,
        publisher: publisher,
        author: author,
        genre: genre,
        poster: posterLink,
        seriesLink: seriesLink,
        issues: [],
        soundtrack: []
    };
    

  
    
    async function processIssue(issueNumber){
        const issueTitle = `Issue ${issueNumber}`;
        const issueLink = `https://comiconlinefree.org/${seriesLink}/issue-${issueNumber}/full`;
        //Add issue data to the comicData.issues array
        comicData.issues.push({
            issueNumber: String(issueNumber),
            title:issueTitle,
            link: issueLink,
        });
    }

    for (let issueNumber = 1; issueNumber <= numIssues; issueNumber++) {
        await processIssue(issueNumber);
    }

    return comicData;
}

function generateSoundtrack(songId, title, pictureLink, youtubeLink) {
    return {
        songId: String(songId),
        title: title,
        picture: pictureLink,
        youtubeLink: youtubeLink
    };
}

async function saveToMongoDB(comicData, collectionName) {
    const client = new MongoClient('mongodb+srv://mpacurar35:bSxEGG9NiKXpoQJ8@comx.w3zfy7x.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to the database');

        const db = client.db('comx'); // Replace with your MongoDB database name
        const collection = db.collection(collectionName);

        // Insert the data into the MongoDB collection
        await collection.insertOne(comicData);

        console.log('Data inserted into MongoDB successfully');
    } finally {
        await client.close();
        console.log('Connection to the database closed');
    }
}

async function main() {
    // Generate data for "The Sandman"
    // const sandmanData = await generateComicData(1, "The Sandman", "DC", "Neil Gaiman", ["Dark fantasy", "Supernatural", "Mythology and Folklore", "Mature Themes"], "https://cdn.dc5.ro/img-prod/1613606329-0.jpeg", 75, "the-sandman-1989");

    // Generate data for the soundtrack of "The Sandman"
    // sandmanData.soundtrack.push(generateSoundtrack(110, "Hammock - Mysterium", "https://f4.bcbits.com/img/a3657669047_5.jpg", "https://www.youtube.com/watch?v=XDh1pPf6bg8"));
    // sandmanData.soundtrack.push(generateSoundtrack(111, "Arca - La Infinita", "https://upload.wikimedia.org/wikipedia/en/a/a3/Kick_IIIII_%28Arca%29.png", "https://youtu.be/QsJv8QQA-Ks"));
    // sandmanData.soundtrack.push(generateSoundtrack(112, "Marconi Union - Weightless", "https://i1.sndcdn.com/artworks-000293390943-x49d3h-t500x500.jpg", "https://youtu.be/UfcAVejslrU"));

    // Save "The Sandman" data to MongoDB
    // await saveToMongoDB(sandmanData, "comic_collection");

    // Generate data for "Hellblazer"
    // const hellblazerData = await generateComicData(2, "Hellblazer", "DC", "Various Authors", ["Horror", "Occult","Dark fantasy","Supernatural"], "https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/original/products/340353/539395/61aH3Rd%2Bp%2BL__51255.1647415153.jpg", 300, "hellblazer");

    // Generate data for the soundtrack of "Hellblazer"
    // hellblazerData.soundtrack.push(generateSoundtrack(210, "Aphex Twin - Rhubarb", "https://i.ytimg.com/vi/q_opPj52Hko/maxresdefault.jpg", "https://www.youtube.com/watch?v=_AWIqXzvX-U"));
    // hellblazerData.soundtrack.push(generateSoundtrack(211, "Steve Roach  - Structures from Silence", "https://upload.wikimedia.org/wikipedia/en/a/a5/Structures_from_Silence_1.jpg", "https://www.youtube.com/watch?v=AsIjyJvhR9A"));
    // hellblazerData.soundtrack.push(generateSoundtrack(212, "William Basinski - Cascade", "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Cascade_-_William_Basinski.jpeg/220px-Cascade_-_William_Basinski.jpeg", "https://www.youtube.com/watch?v=V5s-KLGVcTI"));

    // Save "Hellblazer" data to MongoDB
    // await saveToMongoDB(hellblazerData, "comic_collection");

    // Generate data for "Moon Knight"
    // const moonknightData = await generateComicData(3, "Moon-Knight","Marvel","Various Authors", ["Crime","Mystery","Psychological","Supernatural"],"https://cdn.marvel.com/u/prod/marvel/i/mg/2/80/530e4d1b02751/clean.jpg",38,"moon-knight-1980");
    // //Generate data for the soundtrack of "Moon Knight"
    // moonknightData.soundtrack.push(generateSoundtrack(310, "Eartheater - Prodigal Self", "https://media.pitchfork.com/photos/5db4886ea294dc0009cabd0d/master/pass/Eartheater-Trinity-3000.JPG", "https://www.youtube.com/watch?v=pn4_u54R4So"));
    // moonknightData.soundtrack.push(generateSoundtrack(311, "Burial  - Archangel", "https://f4.bcbits.com/img/a0158336333_65", "https://www.youtube.com/watch?v=afyABj8oFVI"));
    // moonknightData.soundtrack.push(generateSoundtrack(312, "Grimes - Oblivion", "https://i1.sndcdn.com/artworks-000012845814-mkdg31-t500x500.jpg", "https://www.youtube.com/watch?v=m5H-YlcMSbc"));

    // await saveToMongoDB(moonknightData,"comic_collection");

    // Generate data for "Moon Knight"
    // const inhumansData = await generateComicData(4, "Inhumans","Marvel","Paul Jenkins, Jae Lee", ["Fantasy","Adventure","Superhero","Family Drama"],"https://thecomicbookstore.in/wp-content/uploads/2023/04/TCBS4061.png.webp",12,"inhumans-1975");
    // //Generate data for the soundtrack of "Moon Knight"
    // inhumansData.soundtrack.push(generateSoundtrack(410, "Gustav Holst - Planet Mars", "https://i.ytimg.com/vi/L0bcRCCg01I/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AG-AoAC8AGKAgwIABABGH8gHigTMA8=&rs=AOn4CLCQVgN3pYJsCuFtw0dUta3YubcWrA", "https://www.youtube.com/watch?v=L0bcRCCg01I"));
    // inhumansData.soundtrack.push(generateSoundtrack(411, "Led Zeppelin  - Immigrant Song", "https://upload.wikimedia.org/wikipedia/en/d/db/Led_Zeppelin_-_Immigrant_Song.jpg", "https://www.youtube.com/watch?v=P3Y8OWkiUts"));
    // inhumansData.soundtrack.push(generateSoundtrack(412, "Daft Punk - Contact", "https://i.ytimg.com/vi/UoF1dFWKsVk/maxresdefault.jpg", "https://www.youtube.com/watch?v=JI5noh4OyXc"));

    // await saveToMongoDB(inhumansData,"comic_collection");
    // Generate data for "Moon Knight"
    // const sagaData = await generateComicData(5, "Saga","other","Brian Vaughan, Fiona Stables", ["Fantasy","Adventure","Drama","Satire"],"https://static.editura-art.ro/image/7597/saga-1-cover_mobil.jpg",66,"saga");
    // //Generate data for the soundtrack of "Moon Knight"
    // sagaData.soundtrack.push(generateSoundtrack(510, "Stellardrone - Breath in the Light", "https://f4.bcbits.com/img/a3625004621_10.jpg", "https://www.youtube.com/watch?v=E5narnLZDzs"));
    // sagaData.soundtrack.push(generateSoundtrack(511, "Air  - Alone in Kyoto", "https://i.scdn.co/image/ab67616d0000b2736400fab74f28e90759ac8815", "https://www.youtube.com/watch?v=I0SVd_Q5wIg"));
    // sagaData.soundtrack.push(generateSoundtrack(512, "Tycho - Elegy", "https://i1.sndcdn.com/artworks-2mizPLU30nPM-0-t500x500.jpg", "https://www.youtube.com/watch?v=-gPcEhScexQ"));

    // await saveToMongoDB(sagaData,"comic_collection");
    // // Generate data for "Moon Knight"
    // const hellboyData = await generateComicData(6, "Hellboy","other","Mike Mignola", ["Dark fantasy","Occult","Action","Drama"],"https://images.penguinrandomhouse.com/cover/9781506735054",12,"hellboy");
    // //Generate data for the soundtrack of "Moon Knight"
    // hellboyData.soundtrack.push(generateSoundtrack(610, "The Prodigy - Omen", "https://upload.wikimedia.org/wikipedia/en/8/8a/Theprodigyomen.JPG", "https://www.youtube.com/watch?v=uVefPPr69NU"));
    // hellboyData.soundtrack.push(generateSoundtrack(611, "The Rolling Stones - Paint It, Black", "https://upload.wikimedia.org/wikipedia/en/5/58/Paint_It_Black_UK_sleeve.jpg", "https://www.youtube.com/watch?v=O4irXQhgMqg"));
    // hellboyData.soundtrack.push(generateSoundtrack(612, "Creedence Clearwater Revival - Bad Moon Rising", "https://m.media-amazon.com/images/M/MV5BOWY0ZWRmMjAtMzgxYy00MmNiLWE2YjItNTZlMTcwYmVjMjYzXkEyXkFqcGdeQXVyNTM2MDQ5NTU@._V1_.jpg", "https://www.youtube.com/watch?v=5BmEGm-mraE"));

    // await saveToMongoDB(hellboyData,"comic_collection");
    // Generate data for "Moon Knight"
    // const invincibleData = await generateComicData(7, "Invincible","other","Robert Kirkman", ["Action","Mature Themes","Drama","Coming-of-Age"],"https://www.publishersweekly.com/images/data/ARTICLE_PHOTO/photo/000/097/97566-1.JPG",4,"invincible");
    // //Generate data for the soundtrack of "Moon Knight"
    // invincibleData.soundtrack.push(generateSoundtrack(710, "Arca - Anoche", "https://i1.sndcdn.com/artworks-000209382425-zg3dpq-t500x500.jpg", "https://www.youtube.com/watch?v=_KMUKz4LKX0"));
    // invincibleData.soundtrack.push(generateSoundtrack(711, "Bjork - Hyperballad", "https://img.youtube.com/vi/-SDWFvsN2lw/0.jpg", "https://www.youtube.com/watch?v=-SDWFvsN2lw"));
    // invincibleData.soundtrack.push(generateSoundtrack(712, "Eartheater - Peripheral", "https://f4.bcbits.com/img/a2149318150_10.jpg", "https://www.youtube.com/watch?v=bdNueA8TbzE"));

    // await saveToMongoDB(invincibleData,"comic_collection");

    // Generate data for "Moon Knight"
    // const lockeData = await generateComicData(8, "Locke-Key","other","Joe Hill", ["Horror","Fantasy","Drama","Coming-of-Age"],"https://1.bp.blogspot.com/-PEzCfALnnZk/X11mqrpzSzI/AAAAAAAAkDE/nOaFmtewSxwP8moUzLSPBHwIMMVtfDl4gCLcBGAsYHQ/s0/Locke%2B%2526%2BKey%2B%25282008%2529-min.jpg",6,"locke-key-2008");
    // //Generate data for the soundtrack of "Moon Knight"
    // lockeData.soundtrack.push(generateSoundtrack(810, "Tycho - A Walk", "https://i1.sndcdn.com/artworks-000044034079-5t6t9b-t500x500.jpg", "https://www.youtube.com/watch?v=mehLx_Fjv_c"));
    // lockeData.soundtrack.push(generateSoundtrack(811, "Lorn - Anvil", "https://f4.bcbits.com/img/a0665612729_65", "https://www.youtube.com/watch?v=CqaAs_3azSs"));
    // lockeData.soundtrack.push(generateSoundtrack(812, "Carbon Based Lifeforms - Photosynthesis", "https://f4.bcbits.com/img/a2361089209_65", "https://www.youtube.com/watch?v=rRW_zVeRp9I"));

    // await saveToMongoDB(lockeData,"comic_collection");
    // Generate data for "Moon Knight"
    // const ratData = await generateComicData(9, "Rat-Queens","other","Kurtis Wiebe", ["Adventure","Fantasy","Comedy","Sword and Sorcery"],"https://comiconlinefree.org/images/series/large/3352.jpg",16,"rat-queens");
    // //Generate data for the soundtrack of "Moon Knight"
    // ratData.soundtrack.push(generateSoundtrack(910, "Tyr - Hold the Heathen Hammer High", "https://f4.bcbits.com/img/a3821010822_10.jpg", "https://www.youtube.com/watch?v=fu2bgwcv43o"));
    // ratData.soundtrack.push(generateSoundtrack(911, "Battle Beast - King for a day", "https://i.scdn.co/image/ab67616d0000b273d1ee4afaa82b87950cf21b52", "https://www.youtube.com/watch?v=CdeuqT1UqHA"));
    // ratData.soundtrack.push(generateSoundtrack(912, "Alestorm - Drink", "https://images.genius.com/059c4ed0928a6a5d1e8b5d0a806f937a.1000x1000x1.jpg", "https://www.youtube.com/watch?v=f55CqLc6IR0"));

    // await saveToMongoDB(ratData,"comic_collection");

    // const southernData = await generateComicData(10, "Southern-Bastards","other","Jason Aaron", ["Crime","Drama","Gothic","Western"],"https://comiconlinefree.org/images/series/large/7612.jpg",20,"southern-bastards");
    //Generate data for the soundtrack of "Moon Knight"
    // southernData.soundtrack.push(generateSoundtrack(120, "Muddy Waters - Mannish Boy", "https://i.ytimg.com/vi/bSfqNEvykv0/maxresdefault.jpg", "https://www.youtube.com/watch?v=bSfqNEvykv0"));
    // southernData.soundtrack.push(generateSoundtrack(121, "Chris Stapleton  - Parachute", "https://s3.amazonaws.com/halleonard-coverimages/wl/00160733-wl.jpg", "https://www.youtube.com/watch?v=F0Ga_nPZuiI"));
    // southernData.soundtrack.push(generateSoundtrack(122, "R.L.Burnside - It's bad you know", "https://i1.sndcdn.com/artworks-000070454981-qinhoi-t500x500.jpg", "https://www.youtube.com/watch?v=QzC_rGX-XyM"));

    // await saveToMongoDB(southernData,"comic_collection");
    // const questionData = await generateComicData(11, "The-Question","DC","Dennis Oneil", ["Mystery","Superhero","Crime","Existential"],"https://1.bp.blogspot.com/-Q8ypAKrqZF0/XugjUKYA_TI/AAAAAAAAb-s/1RcUqK1QflAsjxRsqmznRADORsoac8tNQCK4BGAsYHg/optimized-yajm.jpg",37,"the-questions-1987");
    //Generate data for the soundtrack of "Moon Knight"
    // questionData.soundtrack.push(generateSoundtrack(130, "Jerry Goldsmith - Main Title", "https://i.scdn.co/image/ab67616d0000b273d162c5c56b14201ff4c4367b", "https://www.youtube.com/watch?v=egga1aB05nA"));
    // questionData.soundtrack.push(generateSoundtrack(131, "Earle Hagen  - Harlem Nocturne", "https://i.ytimg.com/vi/3SKWG7ESmtI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDkk3lF8CiIsi3XpAFHQzKpJqd5RQ", "https://www.youtube.com/watch?v=9woLVFTF2fY"));
    // questionData.soundtrack.push(generateSoundtrack(132, "Jay Hawkins - I Put a Spell on You", "https://m.media-amazon.com/images/I/71G6IUQmK+L._UF1000,1000_QL80_.jpg", "https://www.youtube.com/watch?v=82cdnAUvsw8"));

    // await saveToMongoDB(questionData,"comic_collection");

    // const starmanData = await generateComicData(12, "Starman","DC","Roger Stern", ["Legacy","Superhero","Crime","Antihero"],"https://1.bp.blogspot.com/-AGnNei04kYE/YCuONJxSjZI/AAAAAAAAqD0/N-ondrWRV5EbCZr_4rHjmUGu9BhPzR_qQCLcBGAsYHQ/s0/Starman%2B%25281988%2529-min.jpg",45,"starman-1988");
    // //Generate data for the soundtrack of "Moon Knight"
    // starmanData.soundtrack.push(generateSoundtrack(140, "David Bowie - Starman", "https://media.wnyc.org/i/800/0/c/85/1/david-bowie-001.jpg", "https://www.youtube.com/watch?v=tRcPA7Fzebw"));
    // starmanData.soundtrack.push(generateSoundtrack(141, "REM  - Man on the Moon", "https://upload.wikimedia.org/wikipedia/en/thumb/d/da/R.E.M._-_Man_on_the_Moon.jpg/220px-R.E.M._-_Man_on_the_Moon.jpg", "https://www.youtube.com/watch?v=i2D9bDbbMeY"));
    // starmanData.soundtrack.push(generateSoundtrack(142, "Pink Floyd - I Brain Damage / Eclipse", "https://images.rapgenius.com/793b17ab6574ada708269e2271bf7819.1000x750x1.jpg", "https://www.youtube.com/watch?v=DVQ3-Xe_suY"));

    // await saveToMongoDB(starmanData,"comic_collection");

    // const gothamData = await generateComicData(13, "Gotham-Central","DC","Greg Rucka", ["Crime","Mystery","Drama","Superhero"],"https://4.bp.blogspot.com/-Q-45XEmLA9s/WxalvNELz-I/AAAAAAAACQc/zhNX7FowwEQ8lH0OdVQra_unqZyD6BE1QCLcBGAs/s1600/gotham_central.jpg",40,"gotham-central");
    // //Generate data for the soundtrack of "Moon Knight"
    // gothamData.soundtrack.push(generateSoundtrack(150, "Nina Simone - Sinnerman", "https://i1.sndcdn.com/artworks-k0ZzoBzGM3jTCSEA-CZaxEg-t500x500.jpg", "https://www.youtube.com/watch?v=QH3Fx41Jpl4"));
    // gothamData.soundtrack.push(generateSoundtrack(151, "Morphine  - Buena", "https://i.discogs.com/bT22sBKAbGkSD73ZHLK_ke057npfiE6kx7-_fGb6DkA/rs:fit/g:sm/q:90/h:599/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc2MDUy/NzQtMTQ0NDk5NzQx/My04MTE0LmpwZWc.jpeg", "https://www.youtube.com/watch?v=EthwxA_2lFQ"));
    // gothamData.soundtrack.push(generateSoundtrack(152, "Nick Cave & The Bad Seeds - Red Right Hand", "https://i.ytimg.com/vi/lBVFdSFV2lQ/mqdefault.jpg", "https://www.youtube.com/watch?v=RrxePKps87k"));

    // await saveToMongoDB(gothamData,"comic_collection");

    // const omegaData = await generateComicData(14, "Gotham-Central","DC","Andersen Gabrych", ["Superhero","Antihero","Drama","War"],"https://1.bp.blogspot.com/-o0eIzubN3GQ/X6_ieBNOgtI/AAAAAAAAmRw/ItlDXjC06o89YqIrk_I-scggpfDoDlvvwCLcBGAsYHQ/s0/Omega%2BMen-min.jpg",6,"omega-men");
    //Generate data for the soundtrack of "Moon Knight"
    // omegaData.soundtrack.push(generateSoundtrack(160, "M83 - Outro", "https://i1.sndcdn.com/artworks-MzdgDAFVI0y0WFMG-rVpQ7w-t500x500.jpg", "https://www.youtube.com/watch?v=1cEy4UyYHI0"));
    // omegaData.soundtrack.push(generateSoundtrack(161, "Vangelis  - Blade Runner Blues", "https://i1.sndcdn.com/artworks-000136746397-xxz39h-t500x500.jpg", "https://www.youtube.com/watch?v=ECYLHiXvrBQ"));
    // omegaData.soundtrack.push(generateSoundtrack(162, "Tool - Lateralus", "https://upload.wikimedia.org/wikipedia/en/6/63/Tool_-_Lateralus.jpg", "https://www.youtube.com/watch?v=Y7JG63IuaWs"));

    // await saveToMongoDB(omegaData,"comic_collection");
    // await saveToMongoDB(gothamData,"comic_collection");

    const thunderData = await generateComicData(15, "Thunderbolts","Marvel","Kurt Busiek", ["Superhero","Action","Drama","Antihero"],"https://2.bp.blogspot.com/-_PRkeFIn3cs/XFJPfcImrFI/AAAAAAAAKrs/IKqo-htHDHkNdqCzTP4_JWG0q0isjQEUACLcBGAs/s1600/optimized-i6lz.jpg",174,"thunderbolts-1997");
    //Generate data for the soundtrack of "Moon Knight"
    thunderData.soundtrack.push(generateSoundtrack(170, "Gorillaz - Feel Good Inc", "https://i.scdn.co/image/ab67616d0000b27319d85a472f328a6ed9b704cf", "https://www.youtube.com/watch?v=ZxVw7bvMd3s"));
    thunderData.soundtrack.push(generateSoundtrack(171, "Led Zeppelin - Kashmir", "https://townsquare.media/site/295/files/2012/10/Kashmir.jpg?w=980&q=75", "https://www.youtube.com/watch?v=tzVJPgCn-Z8"));
    thunderData.soundtrack.push(generateSoundtrack(172, "BeastieBoys - Sabotage", "https://m.media-amazon.com/images/I/71FtMzY3KOL._AC_UF894,1000_QL80_.jpg", "https://www.youtube.com/watch?v=a64cJiGKr7c"));

    await saveToMongoDB(thunderData,"comic_collection");

    const visionData = await generateComicData(16, "Vision","Marvel","Tom King", ["Superhero","Mystery","Drama","Family"],"https://comiconlinefree.org/images/series/large/12030.jpg",12,"vision");
    //Generate data for the soundtrack of "Moon Knight"
    visionData.soundtrack.push(generateSoundtrack(180, "Daft Punk - Digital Love", "https://upload.wikimedia.org/wikipedia/en/8/8a/DaftPunk_DigitalLove.jpg", "https://www.youtube.com/watch?v=4whD6uAryMs"));
    visionData.soundtrack.push(generateSoundtrack(181, "MGMT - Electric Feel", "https://i.scdn.co/image/ab67616d0000b2738b32b139981e79f2ebe005eb", "https://www.youtube.com/watch?v=VI2XVLoPMJs"));
    visionData.soundtrack.push(generateSoundtrack(182, "Muse - Supermassive Black Hole", "https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Supermassive_Black_Hole_3.jpg/220px-Supermassive_Black_Hole_3.jpg", "https://www.youtube.com/watch?v=Xsp3_a-PMTw"));

    await saveToMongoDB(visionData,"comic_collection");

    const xData = await generateComicData(17, "X-Statix","Marvel","Peter Milligan", ["Superhero","Satire","Comedy","Drama"],"https://comiconlinefree.org/images/series/large/6801.jpg",26,"x-statix");
    //Generate data for the soundtrack of "Moon Knight"
    xData.soundtrack.push(generateSoundtrack(190, "Gorillaz - Clint Eastwood", "https://f4.bcbits.com/img/a1322794582_65", "https://www.youtube.com/watch?v=I7yqFVEvdY0"));
    xData.soundtrack.push(generateSoundtrack(191, "Depeche Mode - Personal Jesus", "https://upload.wikimedia.org/wikipedia/en/thumb/5/50/DepecheModePersonalJesus.jpg/220px-DepecheModePersonalJesus.jpg", "https://www.youtube.com/watch?v=pm3sP0n7F-M"));
    xData.soundtrack.push(generateSoundtrack(192, "Nirvana - Smells Like Teen Spirit", "https://i.discogs.com/Ai-DX_XNXA1iwGHQZ4jAnz_Y0N7cbMT8DFoB42CXphc/rs:fit/g:sm/q:90/h:600/w:590/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ4ODI4/MC0xNjc4Nzc1MjI2/LTEwNTYuanBlZw.jpeg", "https://www.youtube.com/watch?v=NLNjKYMJrpc"));

    await saveToMongoDB(xData,"comic_collection");

    const blackData = await generateComicData(18, "Black-Widow","Marvel","Sylvia Soska", ["Superhero","Thriller","Crime","Drama"],"https://3.bp.blogspot.com/-wR1CPSzohTc/XELIzs7JZMI/AAAAAAAAKF0/yf5ZCtAd938gfi-tXb9ESgRElBwz8ju2ACLcBGAs/s1600/Black%2BWidow%2B%25282019%2529-min.jpg",5,"black-widow-2019");
    //Generate data for the soundtrack of "Moon Knight"
    blackData.soundtrack.push(generateSoundtrack(220, "AC/DC - Back in Black", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/ACDC_Back_in_Black_cover.svg/1200px-ACDC_Back_in_Black_cover.svg.png", "https://www.youtube.com/watch?v=zjx0D1Ivy-Q"));
    blackData.soundtrack.push(generateSoundtrack(221, "Michael Jackson - Smooth Criminal", "https://e.snmc.io/i/1200/s/cea403faa34157d8ea146947d2bb7fd6/4525281", "https://www.youtube.com/watch?v=RCmuTH6T7fk"));
    blackData.soundtrack.push(generateSoundtrack(222, "Britney Spears - Toxic", "https://upload.wikimedia.org/wikipedia/en/2/21/Britney_Spears_Toxic.png", "https://www.youtube.com/watch?v=dm0ndgjk9V4"));

    await saveToMongoDB(blackData,"comic_collection");



}


main();
