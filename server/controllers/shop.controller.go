package controllers

import (
	"ecommerce/initializers"
	"ecommerce/models"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

// AddItems -> Adds new items to shop
func AddItems(c *fiber.Ctx) error {
	var payload *models.RegisterItemInput

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  0,
			"message": err.Error(),
		})
	}

	listerID := c.Locals("user").(models.UserResponse).ID
	newItem := models.Item{
		Title:       payload.Title,
		Description: payload.Description,
		Price:       payload.Price,
		AuthorID:    listerID,
	}
	fmt.Println(newItem)
	result := initializers.DB.Create(&newItem)

	if result.Error != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"status":  0,
			"message": "Something bad happened",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"status": 1,
		"data":   "Item added",
	})
}

// GetItemsByUser -> Find all items which are listed by an user.
func GetItemsByUser(c *fiber.Ctx) error {
	listerId := c.Locals("user").(models.UserResponse).ID
	var items []models.Item

	result := initializers.DB.
		Where("author_id = ? ", listerId).
		Preload("Author").
		Find(&items)

	if result.Error != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"status":  0,
			"message": "Something bad happened",
		})
	}

	var itemResponses []models.ItemResponse
	for _, item := range items {
		log.Println(item)
		itemResponses = append(itemResponses, models.FilterItemResponse(&item))
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": 1,
		"data":   itemResponses,
	})
}

// GetItemById -> Fetch details for a particular item
func GetItemByID(c *fiber.Ctx) error {
	itemId := c.Query("item")

	var item models.Item
	isItemPresent := initializers.DB.
		Where("id = ?", itemId).
		Preload("Author").
		First(&item)

	if isItemPresent.Error != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"status":  0,
			"message": "Something bad happened",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": 1,
		"data":   models.FilterItemResponse(&item),
	})
}
