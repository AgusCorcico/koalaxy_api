const { Router } = require('express');
const router = Router();
const { allGenres } = require('../../controllers/genreControllers');


router.get('/', async(req,res)=>{
    try {
        const genres = await allGenres();
        if(!genres.length){
            res.send('There are not genres')
        }else{
            res.send(genres)
        }
    } catch (err) {
        console.log(err)
    }
})


module.exports = router;




