<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\AddProductController;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\Mapping\Annotation as Gedmo;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiFilter(
    SearchFilter::class,
    properties:[
        "category" => "exact",
        "owner"=> "exact"
    ]
)]
#[ApiResource(
    normalizationContext: ['groups' => 'read:product'],
    collectionOperations: [
        'get' => [
            'formats' => 'jsonld',
        ],
        'post' => [
            'controller' => AddProductController::class,
            'deserialize' => false
        ]
        ],
        itemOperations:[
            'get',
            'put',
            'delete',
            'edit' => [
                'method' => 'POST',
                'path' => 'products/{id}/edit',
                'controller' => 'App\Controller\editProductController::editProduct',
                'deserialize' => false
            ],
            'like' => [
                'method' => 'POST',
                'path' => 'products/{id}/like',
                'controller' => 'App\Controller\editProductController::like',
                'deserialize' => false
            ]
        ]
)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:product','read:user',"read:cart"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read:product','read:user',"read:cart"])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['read:product','read:user',"read:cart"])]
    private ?float $price = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read:product','read:user',"read:cart"])]
    private ?string $location = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read:product','read:user',"read:cart"])]
    private ?string $status = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Gedmo\Timestampable(on: "create")]
    #[Groups(['read:product','read:user',"read:cart"])]
    private ?\DateTimeInterface $createdAt = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Gedmo\Timestampable(on: "update")]
    #[Groups(['read:product','read:user',"read:cart"])]
    private ?\DateTimeInterface $updatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:product', 'read:user',"read:cart"])]
    private ?Category $category = null;

    #[ORM\ManyToMany(targetEntity: Cart::class, mappedBy: 'products')]
    private Collection $carts;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:product','read:user',"read:cart"])]
    private ?User $owner = null;

    #[ORM\Column(nullable: true)]
    private ?array $likedBy = [];

    #[ORM\Column]
    #[Groups(['read:product','read:user',"read:cart"])]
    private ?int $likes = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read:product','read:user',"read:cart"])]
    private ?string $phoneNumber = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['read:product','read:user',"read:cart"])]
    private ?string $description = null;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: ProductImage::class, orphanRemoval: true , cascade:['persist'])]
    #[Groups(['read:product','read:user',"read:cart"])]
    private Collection $productImages;


    public function __construct()
    {
        $this->carts = new ArrayCollection();
        $this->productImages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): static
    {
        $this->location = $location;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }


    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }


    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return Collection<int, Cart>
     */
    public function getCarts(): Collection
    {
        return $this->carts;
    }

    public function addCart(Cart $cart): static
    {
        if (!$this->carts->contains($cart)) {
            $this->carts->add($cart);
            $cart->addProduct($this);
        }

        return $this;
    }

    public function removeCart(Cart $cart): static
    {
        if ($this->carts->removeElement($cart)) {
            $cart->removeProduct($this);
        }

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): static
    {
        $this->owner = $owner;

        return $this;
    }

    public function getLikes(): ?int
    {
        return $this->likes;
    }

    public function setLikes(int $likes): static
    {
        $this->likes = $likes;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): static
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, ProductImage>
     */
    public function getProductImages(): Collection
    {
        return $this->productImages;
    }

    public function addProductImage(ProductImage $productImage): static
    {
        if (!$this->productImages->contains($productImage)) {
            $this->productImages->add($productImage);
            $productImage->setProduct($this);
        }

        return $this;
    }

    public function removeProductImage(ProductImage $productImage): static
    {
        if ($this->productImages->removeElement($productImage)) {
            // set the owning side to null (unless already changed)
            if ($productImage->getProduct() === $this) {
                $productImage->setProduct(null);
            }
        }

        return $this;
    }

    public function getLikedBy(): ?array
    {
        return $this->likedBy;
    }

    public function addLikedBy(string $userEmail): void
    {
        if (!in_array($userEmail, $this->likedBy, true)) {
            $this->likedBy[] = $userEmail;
        }
    }

    public function removeLikedBy(string $userEmail): void
    {
        $index = array_search($userEmail, $this->likedBy, true);

        if ($index !== false) {
            // Remove the user from the array
            array_splice($this->likedBy, $index, 1);
        }
    }
}
