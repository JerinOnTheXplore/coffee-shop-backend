import { prisma } from "../../lib/prisma"

const createReview =async(
    userId: string,
    coffeeId: string,
    rating: number,
    comment: string
)=>{
    // rating valid kina..
    if (rating <1 || rating> 5){
        throw new Error("Rating must be between 1 and 5..")
    }
    //coffee exist kore kina..
    const coffee = await prisma.coffee.findUnique({where:{id:coffeeId}});
    if (!coffee){
       throw new Error("Coffee not found"); 
    }
    //user already review dilo kina seta check kore..
    const existing = await prisma.review.findUnique({
        where: {userId_coffeeId: {userId, coffeeId}},
    });
    if(existing){
        throw new Error("You have already reviewed this coffee..");
    }

    //review create kore..
    return prisma.review.create({
        data:{
            rating,
            comment,
            userId,
            coffeeId
        },
    });
};

const getCoffeeReviews = async (coffeeId: string)=>{
    const reviews = await prisma.review.findMany({
        where:{coffeeId},
        include:{
        user: {select: {id:true, name:true}},
        },
    });

    const avgRating = reviews.reduce((sum,r)=> sum + r.rating, 0)/(reviews.length || 1);

    return {avgRating, reviews};
};

const deleteReview = async(reviewID:string)=>{
    //review exist kore kina check kore..
    const review = await prisma.review.findUnique({
        where:{id: reviewID},
    });

    if(!review){
        throw new Error("review not found");
    }

    return prisma.review.delete({
        where: {id: reviewID}
    });
};

export const ReviewService={
    createReview,
    getCoffeeReviews,
    deleteReview,
}