<?php 

namespace App\Controller;

use App\Entity\Product;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;

class editProductController 
{
    private EntityManagerInterface $entityManager;
    private Security $security;

    public function __construct(EntityManagerInterface $entityManager , Security $security)
    {
        $this->entityManager = $entityManager;
        $this->security = $security;
    }

    public function editProduct(Request $request,int $id): JsonResponse
    {
        $product = $this->entityManager->getRepository(Product::class)->find($id);
        if (!$this->isUserAuthorized($this->security->getUser() , $product)) {
            return new JsonResponse(['code' => JsonResponse::HTTP_FORBIDDEN, 'message' => 'you are not authorized to update this product'], JsonResponse::HTTP_FORBIDDEN);
        }

        $price = $request->request->get('price');
        $description = $request->request->get('description');
        $location = $request->request->get('location');
        $name = $request->request->get('name');
        $phoneNumber = $request->request->get('phoneNumber');
        $status = $request->request->get('status');

        if ($description) {
            $product->setDescription($description);
        }
        if ($status) {
            $product->setStatus($status);
        }
        if ($price) {
            $product->setPrice($price);
        }
        if ($location) {
            $product->setLocation($location);
        }
        if ($name) {
            $product->setName($name);
        }
        if ($phoneNumber) {
            $product->setPhoneNumber($phoneNumber);
        }

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        return new JsonResponse(['code' => JsonResponse::HTTP_OK, 'message' => 'post edited successfully', "product" => $product], JsonResponse::HTTP_OK);
    }

    public function like(Request $request , int $id) : JsonResponse
    {
        $product = $this->entityManager->getRepository(Product::class)->find($id);
        $data = json_decode($request->getContent() , true);
        // dd($product , $data);
        if ($data['isLiked'] === true) {
            if ($this->hasUserAlreadyLiked($this->security->getUser() , $product)) {
                return new JsonResponse(['code' => JsonResponse::HTTP_CONFLICT, 'message' => 'u already liked this product'], JsonResponse::HTTP_CONFLICT);
            }
            
            $product->addLikedBy($this->security->getUser()->getUserIdentifier());
            $product->setLikes($product->getLikes() + 1);
        }
        if ($data['isDisliked'] === true) {
            if ($this->hasUserAlreadyLiked($this->security->getUser() , $product)) {    
                // var_dump($product->getLikedBy(), $product->getLikes());
                $product->removeLikedBy($this->security->getUser()->getUserIdentifier());
                $product->setLikes($product->getLikes() - 1);
                // dd($product->getLikedBy() , $product->getLikes());        
            }else {
                return new JsonResponse(['code' => JsonResponse::HTTP_CONFLICT, 'message' => "you haven't liked this product"], JsonResponse::HTTP_CONFLICT);
            }
        }

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        return new JsonResponse(['code' => JsonResponse::HTTP_OK, 'message' => 'like updated successfully', "liked" => $product->getLikes()], JsonResponse::HTTP_OK);

    }


    public function isUserAuthorized(User $user, Product $product): bool
    {
        return $user->getId() === $product->getOwner()->getId();
    }
    public function hasUserAlreadyLiked(User $user, Product $product): bool
    {
        return in_array($user->getUserIdentifier() , $product->getLikedBy() , true);
    }

    
}