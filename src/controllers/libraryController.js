const  { User, Library, Productlibrary, Product }  = require("../db");

const addProductLibrary = async(productId,userId) => {
    try {
        //busco el usuario dueño del carrito y el producto que quiero agregar
        let user = await User.findOne({
            where: { id: userId}
        })
        let product = await Product.findOne({
            where: { id: productId}
        })

        let library = null;
        //si el usuario no tenia carrito lo creo y se lo asigno
        if(!user.libraryId) {
            library = await Library.create();
            await user.update({ libraryId: library.id});
        }else {
        //si ya tenia carrito lo traigo y busco los productos que tiene    
            library = await Library.findOne({
                where: { id: user.libraryId },
                include: { model: Productlibrary}
            });
        }
        //vemos si el producto ya esta agregado o no al carrito

        let findProduct = await library.productlibrary?.find(e => e.productId == productId);
        if(findProduct){
            return 'Product already exists in the library';
        }else {
            await Productlibrary.create({
                libraryId : library.id,
                productId: product.id,
                img:product.img,
                name:product.name,
            });
            return "se actualizo";
        }

    } catch (err) {
        console.log(err)
    }
} 




/* const deleteProductCart = async (req, res) => {
    try {
        const { productCardId } = req.query;
        let productCart = await Productcart.findOne({
        where: { id: productCardId }
    });
    if(!productCart){
        res.status(404).send("no se puede eliminar un producto que no agregaste tonto ")
    }
    await productCart.destroy();

    const cart = await Cart.findOne({ where: { id: productCart.cartId} });
    updateTotalValue(cart); 
    res.status(200).send('Product has been removed');
    } catch (error) {
        console.log(error)
    }
}; */


module.exports = {addProductLibrary}