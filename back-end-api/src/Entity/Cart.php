<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CartRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CartRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => "read:cart"],
    itemOperations: [
        'get',
        'addProduct' => [
            'method' => 'POST',
            'path' => '/carts/{id}/add_product',
            'controller' => 'App\Controller\CartController::addProduct',
        ],
        'removeProduct' => [
            'method' => 'POST',
            'path' => '/carts/{id}/remove_product',
            'controller' => 'App\Controller\CartController::removeProduct',
        ]
    ] 
)]
class Cart
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["read:cart"])]
    private ?int $id = null;

    #[ORM\ManyToMany(targetEntity: Product::class, inversedBy: 'carts')]
    #[Groups(["read:cart"])]
    private Collection $products;

    #[ORM\OneToOne(mappedBy: 'cart', cascade: ['persist', 'remove'])]
    private ?User $owner = null;

    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Product>
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): static
    {
        if (!$this->products->contains($product)) {
            $this->products->add($product);
        }

        return $this;
    }

    public function removeProduct(Product $product): static
    {
        $this->products->removeElement($product);

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(User $owner): static
    {
        // set the owning side of the relation if necessary
        if ($owner->getCart() !== $this) {
            $owner->setCart($this);
        }

        $this->owner = $owner;

        return $this;
    }
}
