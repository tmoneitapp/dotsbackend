var express = require('express');
var bodyParser = require('body-parser');
var orders = require('../services/orders');
var authenticate = require('../services/authenticate');
var error = require('../shared/error');
var multer = require('multer');

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
        //console.log(orders);
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
        if(order.message == error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            console.log('Order Created', order);
            res.statusCode =201;
            res.setHeader('Content-Type','application/json');
            res.json(order);
        }
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

orderRouter.route('/filter')
.get(authenticate.authenticateToken, (req, res, next) =>{
    if(req.query.status){
        const status = req.query.status;
        orders.find({'status': status})
        .then((orders) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(orders);         
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else{
        // return bad request by default
        res.statusCode=400;
        res.end();
    }

    
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
.put(authenticate.authenticateToken, 
    upload.fields([{
        name: 'file1', maxCount: 1
    }, {
        name: 'file2', maxCount: 1
    }, {
        name: 'file3', maxCount: 1
    }, {
        name: 'file4', maxCount: 1
    }]), (req, res, next) =>{
    orders.findByIdAndUpdate(req.params.orderId, req)
    .then((order) =>{
        if(order.message == error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(order);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) =>{
    orders.findByIdAndRemove(req.params.orderId)
    .then((resp) =>{
        if(resp.message == error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        }
    }, (err) => next(err))
    .catch((err) =>next(err));
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