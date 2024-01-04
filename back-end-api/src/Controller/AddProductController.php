<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Product;
use App\Entity\ProductImage;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraints\Count;
use Symfony\Component\Validator\Validator\ValidatorInterface;

use function PHPUnit\Framework\isEmpty;

class AddProductController
{
    private EntityManagerInterface $entityManager;
    private ValidatorInterface $validator;
    private Security $security;

    public function __construct(EntityManagerInterface $entityManager, ValidatorInterface $validator, Security $security)
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
        $this->security = $security;
    }

    public function __invoke(Request $request): Product | JsonResponse
    {
        $imageFiles = $request->files->get('imageFiles');
        $categoryId =  (int)$request->request->get('category');
        $price = (float)$request->request->get('price');
        $phoneNumber = $request->request->get('phoneNumber');
        $description = $request->request->get('description');
        $location = $request->request->get('location');
        $name = $request->request->get('name');
        // Validate the count of imageFiles
        $constraint = new Count([
            'max' => 10,
            'maxMessage' => 'You cannot upload more than 10 images.',
        ]);

        $violations = $this->validator->validate($imageFiles, $constraint);

        if (count($violations) > 0) {
            return new JsonResponse(['code' => JsonResponse::HTTP_BAD_REQUEST, 'message' => $violations[0]->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }
        $product = new Product();


        if (!empty($imageFiles)) {
            foreach ($imageFiles as $imageFile) {
                $productImage = new ProductImage();
                $productImage->setProduct($product);
                $productImage->setImageFile($imageFile);
                $product->addProductImage($productImage);
            }
        } else {
            return new JsonResponse(['code' => JsonResponse::HTTP_BAD_REQUEST, 'message' => 'You must provide at least one image to create the product'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $owner = $this->security->getUser();
        $category = $this->entityManager->getRepository(Category::class)->find($categoryId);

        if (!$owner) {
            return new JsonResponse(['code' => JsonResponse::HTTP_NOT_FOUND, 'message' => 'The specified owner does not exist'], JsonResponse::HTTP_NOT_FOUND);
        }

        if (!$category) {
            return new JsonResponse(['code' => JsonResponse::HTTP_NOT_FOUND, 'message' => 'The specified category does not exist'], JsonResponse::HTTP_NOT_FOUND);
        }

        $product->setPrice($price);
        $product->setLikes(0);
        $product->setPhoneNumber($phoneNumber);
        $product->setStatus("available");
        $product->setDescription($description);
        $product->setLocation($location);
        $product->setName($name);
        $product->setCategory($category);
        $product->setOwner($owner);

        return $product;
    }

}
