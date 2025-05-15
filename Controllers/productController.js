// all the fns related to products are added here

exports.addProjects=(req,res)=>{
    console.log("Inside addProject function in productController")
    res.status(201).json("Product added successfully")
}

exports.getProducts=(req,res)=>{
    console.log("Inside getProducts function in productController")
    res.status(200).json(
        [
            {
                name:"Samsung S25",
                price:78000
            },
            {
                name:"Iphone 16",
                price:75000
            }

        ]
    )
}