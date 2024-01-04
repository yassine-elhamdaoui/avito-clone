<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CartController
{ 
    private EntityManagerInterface $entityManager;
    function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    #[Route('/carts/{id}/add_product', name: 'add_product', methods: ['POST'])]
    public function addProduct(Request $request ,  ?int $id) : JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $productId = $data['productId'];
        $product = $this->entityManager->getRepository(Product::class)->find($productId);

        if (!$product) {
            return new JsonResponse(['code'=> JsonResponse::HTTP_NOT_FOUND , "message" => "the product you entered doesn't exist"] , JsonResponse::HTTP_NOT_FOUND);
        }

        $cart = $this->entityManager->getRepository(Cart::class)->find($id);
        foreach ($cart->getProducts() as $existing_product) {
            if ($product == $existing_product) {
                return new JsonResponse(['code' => JsonResponse::HTTP_CONFLICT, "message" => "product is already in cart"], JsonResponse::HTTP_CONFLICT);
            }
        }
        $cart->addProduct($product);

        $this->entityManager->persist($cart);
        $this->entityManager->flush();

        return new JsonResponse(['code' => JsonResponse::HTTP_CREATED, "message" => "product was added to the cart successfully"], JsonResponse::HTTP_CREATED);
        
    
    }

    #[Route('/carts/{id}/remove_product', name: 'remove_product', methods: ['POST'])]
    public function removeProduct(Request $request ,  ?int $id) : JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $productId = $data['productId'];
        $product = $this->entityManager->getRepository(Product::class)->find($productId);

        if (!$product) {
            return new JsonResponse(['code'=> JsonResponse::HTTP_NOT_FOUND , "message" => "the product you entered doesn't exist"] , JsonResponse::HTTP_NOT_FOUND);
        }

        $cart = $this->entityManager->getRepository(Cart::class)->find($id);
        // foreach ($cart->getProducts() as $existing_product) {
        //     if ($product == $existing_product) {
        //         return new JsonResponse(['code' => JsonResponse::HTTP_CONFLICT, "message" => "product is already in cart"], JsonResponse::HTTP_CONFLICT);
        //     }
        // }
        $cart->removeProduct($product);

        $this->entityManager->persist($cart);
        $this->entityManager->flush();

        return new JsonResponse(['code' => JsonResponse::HTTP_CREATED, "message" => "product was removed from cart successfully"], JsonResponse::HTTP_CREATED);
        
    
    }
}