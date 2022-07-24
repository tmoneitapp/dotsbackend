var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var orders = require('../services/orders');
var authenticate = require('../services/authenticate');
var error = require('../shared/error');
var multer = require('multer');
var os = require('os');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, os.tmpdir());
    },

    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('You can upload only selected files!'),false);
    }
    cb(null, true);
};

const upload = multer({
    //storage: storage
    storage: multer.memoryStorage()
    //fileFilter: fileFilter,
    // limits: {
    //     fileSize: 5 * 1024 * 1024, // no larger than 5mb
    // }
});

// app.post('/rest/upload',
//          upload.fields([{
//            name: 'video', maxCount: 1
//          }, {
//            name: 'subtitles', maxCount: 1
//          }]), function(req, res, next){
//   // ...
// }
// file.mimetype === 'application/pdf' ||
//       file.mimetype === 'application/msword' ||
//       file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

// const fs = require('file-system');
 
// app.post('/uploadphoto', upload.single('myImage'), (req, res) => {
//     var img = fs.readFileSync(req.file.path);
//     var encode_image = img.toString('base64');
//     // Define a JSONobject for the image attributes for saving to database
 
//     var finalImg = {
//         contentType: req.file.mimetype,
//         image: Buffer.from(encode_image, 'base64')
//     };
//      db.collection('myCollection').insertOne(finalImg, (err, result) => {
//         console.log(result)
//         if (err) return console.log(err)
//         console.log('saved to database')
//         res.redirect('/')
//     })
// })

// app.get('/photos', (req, res) => {
//     db.collection('myCollection').find().toArray((err, result) => {
//         const imgArray = result.map(element => element._id);
//         console.log(imgArray);
//         if (err) return console.log(err)
//         res.send(imgArray)
 
//     })
// });
// const ObjectId = require('mongodb').ObjectId;
 
// app.get('/photo/:id', (req, res) => {
//     var filename = req.params.id;
//     db.collection('myCollection').findOne({ '_id': ObjectId(filename) }, (err, result) => {
//         if (err) return console.log(err)
//         res.contentType('image/jpeg');
//         res.send(result.image.buffer)
//     })
// })
// upload.fields([{
//     name: 'image1', maxCount: 1
// }, {
//     name: 'image2', maxCount: 1
// }, {
//     name: 'image3', maxCount: 1
// }, {
//     name: 'image4', maxCount: 1
// }])

// if(req.files.upload instanceof Array){ 
//     for (var i = 0; i < req.files.upload.length; i ++ ){
//         let name = req.files.upload[i].name;
//         let data = req.files.upload[i].data;
//         let write = writeFile(name, data);

//         console.log(req.files.upload[i].name);

//         write.then(()=> res.end('fileS uploaded'))
//         .catch((e)=> res.status(500).send(e.message));

//     } 

//     }else {

//         // let name = req.files.upload.name;
//         // let data = req.files.upload.data;

//         // writeFile(name, data)

//         // res.end("file uploaded")

// }
// });

var uploadMultiple = upload.fields([{ name: 'file1', maxCount: 10 }, { name: 'file2', maxCount: 10 }])
 

var orderRouter = express.Router();
orderRouter.use(bodyParser.json());

orderRouter.route('/upload')
.post(uploadMultiple, (req,res,next) =>{
    //console.log('reach here');
    if(req.files){
        console.log(req.files);
        
        if(req.files.file1){
            console.log(req.files.file1);
            console.log(req.files.file1[0].originalname);
        }
     
    }
    res.sendStatus(200);
}, (err) => next(err));

orderRouter.route('/v2')
.post(authenticate.authenticateToken, upload.fields([{
    name: 'file1', maxCount: 1
}, {
    name: 'file2', maxCount: 1
}]), (req, res, next) =>{
    // if(req.files){
    //     console.log(req.files);

    //     if(req.files.file1){
    //         console.log(req.files.file1);
    //         console.log(req.files.file1[0].originalname);
    //     }
    // }
    //console.log('post body: ' + req.body);

    orders.create2(req)
    .then((order) =>{
        console.log('Order with attachment created', order);
        res.statusCode =201;
        res.setHeader('Content-Type','application/json');
        res.json(order);
    }, (err) => next(err))
    .catch((err) => next(err));
});

orderRouter.route('/')
.get(authenticate.authenticateToken, (req, res, next) =>{
    orders.getMultiple()
    .then((orders) =>{
        console.log(orders);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(orders); 
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.authenticateToken,
    upload.fields([{
        name: 'file1', maxCount: 1
    }, {
        name: 'file2', maxCount: 1
    }, {
        name: 'file3', maxCount: 1
    }, {
        name: 'file4', maxCount: 1
    }])
    , (req, res, next) =>{

    orders.create(req)
    .then((order) =>{
        console.log('Order Created', order);
        res.statusCode =201;
        res.setHeader('Content-Type','application/json');
        res.json(order);
    })
    .catch((err) => next(err));
})
.put((req, res, next) =>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /orders');
})
.delete((req, res, next) =>{
    res.statusCode = 403;
    res.end('DELETE operation not ready on /orders');
});

orderRouter.route('/:orderId')
.get(authenticate.authenticateToken, (req, res, next) =>{
    orders.findById(req.params.orderId)
    .then((order) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(order);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) =>{
    res.statusCode = 403;
    res.end('POST operation not ready on /orders');
})
.put((req, res, next) =>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /orders');
})
.delete((req, res, next) =>{
    res.statusCode = 403;
    res.end('DELETE operation not ready on /orders');
});

orderRouter.route('/:orderId/details')
.get(authenticate.authenticateToken, (req, res, next) =>{

})
.post(authenticate.authenticateToken, (req, res, next) =>{
    res.statusCode = 403;
    res.end('POST operation not ready on /orders');
})
.put(authenticate.authenticateToken, (req, res, next) =>{
    res.statusCode = 403;
    res.end('PUT operation not ready on /orders');
})
.delete(authenticate.authenticateToken, (req, res, next) =>{
    res.statusCode = 403;
    res.end('DELETE operation not ready on /orders');
});



module.exports = orderRouter;