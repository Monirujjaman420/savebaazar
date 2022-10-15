const products = require("../../models/products.model");
const { FileUpload, Host, DeleteFile } = require("../../helplers/index");

/*list */
const list = async (req, res, next) => {
  try {
    let currentPage = parseInt(req.query.page) || 1
    let itemPerPage = 12
    const items = [];
    const results = await products.find();
                          // .skip((itemPerPage * currentPage) - itemPerPage)
                          // .limit(itemPerPage);
    let totalProduct = await products.countDocuments()
    let totalPage = parseInt(totalProduct / itemPerPage)

    if (results && results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        const element = results[i];
        
        items.push({
          _id: element._id,
          name: element.name,
          image: element.image
            ? Host(req) + "uploads/product/" + element.image
            : null,
          category_id: element.category_id,
          price: element.price,
          description: element.description,
          product_status: element.product_status,
        });
      }
    }

    res.status(200).json({
      status: true,
      data: items,
      totalPage: totalPage,
      currentPage: currentPage,
      itemPerPage: itemPerPage
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/*store */
const store = async (req, res, next) => {
  try {
    const { name, price, category_id, description } = req.body;
    const image = req.files.image;

    const uploadFile = await FileUpload(image, "./uploads/product/");
    if (!uploadFile) {
      return res.status(501).json({
        status: false,
        message: "Failed to upload image",
      });
    }  

    const newProduct = new products({
      name,
      price,
      category_id,
      description,
      image: uploadFile,
    });
    await newProduct.save();
    res.status(201).json({
      status: true,
      message: "Product Create Successfully...!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/*show */
const show = async (req, res, next) => {
  try {
    const item = [];
    const { id } = req.params;
    const element = await products.findById(id);
    
    if (element) {
      item.push({
        _id: element._id,
        name: element.name,
        image: element.image
          ? Host(req) + "uploads/product/" + element.image
          : null,
        category_id: element.category_id,
        price: element.price,
        description: element.description,
        product_status: element.product_status,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Product Not Found",
      });
    }

    res.status(201).json({
      status: true,
      data: item,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/*update */
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, category_id, description } = req.body;
    const image = req.files.image;

    const uploadFile = await FileUpload(image, "./uploads/product/");
    if (!uploadFile) {
      return res.status(501).json({
        status: false,
        message: "Failed to upload image",
      });
    }

    await products.findByIdAndUpdate(id, {
      $set: {
        name,
        price,
        description,
        category_id,
        image: uploadFile,
      },
    });

    res.status(201).json({
      status: true,
      message: "Product Updated Succesfully...!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/*destroy */
const destroy = async (req, res, next) => {
  try {
      const {id} = req.params
      const IsRemove = await products.findByIdAndDelete(id)
      if(!IsRemove){
        res.status(404).json({
            status:true,
            message: "something wrong"
        })
      }
      await DeleteFile("./uploads/product", IsRemove.image)

      res.status(201).json({
          status: true,
          message: "Product Delete Successfully...!"
      })

  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**--------------without pagination all product show----------- */
const all = async(req, res, next) => {
  try {

    const items = [];
    const results = await products.find()
    let totalProduct = await products.countDocuments()
    let totalPage = parseInt(totalProduct / itemPerPage)

    if (results && results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        const element = results[i];
        
        items.push({
          _id: element._id,
          name: element.name,
          image: element.image
            ? Host(req) + "uploads/product/" + element.image
            : null,
          category_id: element.category_id,
          price: element.price,
          description: element.description,
          product_status: element.product_status,
        });
      }
    }

    res.status(200).json({
      status: true,
      data: items,
      totalPage: totalPage,
      currentPage: currentPage,
      itemPerPage: itemPerPage
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  list,
  all,
  store,
  show,
  update,
  destroy,
};
