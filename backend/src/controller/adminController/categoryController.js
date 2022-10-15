const categories = require("../../models/categories.model");
const { FileUpload, Host, DeleteFile } = require("../../helplers/index");

/*List*/
const index = async (req, res, next) => {
  try {
    const items = [];
    const results = await categories.find();

    if (results && results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        const element = results[i];
        items.push({
          _id: element._id,
          name: element.name,
          home: element.home,
          cat_status: element.cat_status,
          image: element.image
            ? Host(req) + "uploads/category/" + element.image
            : null,
        });
      }
    }

    res.status(200).json({
      status: true,
      data: items,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/*store*/
const store = async (req, res, next) => {
  try {
    const { name } = req.body;
    const image = req.files.image;
    const uploadFile = await FileUpload(image, "./uploads/category/");
    if (!uploadFile) {
      return res.status(501).json({
        status: false,
        message: "Failed to upload image",
      });
    }
    const newCategory = new categories({
      name,
      image: uploadFile,
    });
    await newCategory.save();
    res.status(200).json({
      status: true,
      message: "Category Added Successfully.!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/*status change*/
const status = async (req, res, next) => {
  try {
    const { id } = req.params
   
    const IsStatus = await categories.findById(id)

    if (IsStatus.cat_status == false) {
      IsStatus.cat_status = true
      IsStatus.save()
      res.status(200).json({ 
        status: true,
        message: "Category Status Is Active...!",
      });
    } else {
      IsStatus.cat_status = false
      IsStatus.save();
      res.status(200).json({ 
        status: true,
        message: "Category Status Is Deactive...!",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/*update */
const update = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name } = req.body
    const image = req.files.image

    const uploadFile = await FileUpload(image, "./uploads/category/");
    if (!uploadFile) {
      return res.status(501).json({
        status: false,
        message: "Failed to upload image",
      });
    }

    await categories.findByIdAndUpdate(
        id,
        {
            $set: {
                name,
                image:uploadFile
            }
        }
    )

    res.status(200).json({
        status: true,
        message: "Category Updated Successfully...!"
    })
} catch (error) {
    console.log(error);
    next(error)
}
};

/*Delete */
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isRemoved = await categories.findByIdAndDelete(id);
    if (!isRemoved) {
      return res.status(501).json({
        status: false,
        message: "Something going wrong.",
      });
    }

    await DeleteFile("./uploads/category/", isRemoved.image);

    res.status(200).json({
      status: true,
      message: "Category Deleted Successfully...!",
    });
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

/**-----------show home or not show in home */
const showHome = async(req, res, next) => {
  try {
    const { id } = req.params
   
    const IsHome = await categories.findById(id)

    if (IsHome.home == false) {
      IsHome.home = true
      IsHome.save()
      res.status(200).json({ 
        status: true,
        message: "Category Home Status Is Active...!",
      });
    } else {
      IsHome.home = false
      IsHome.save();
      res.status(200).json({ 
        status: true,
        message: "Category Home Status Is Deactive...!",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}


/*Show*/
const Show = async (req, res, next) => {
  try {
    const items = [];
    const {id} = req.params
    const results = await categories.findById(id);

    res.status(200).json({
      status: true,
      data: results,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  index,
  store,
  update,
  status,
  destroy,
  showHome,
  Show
};
