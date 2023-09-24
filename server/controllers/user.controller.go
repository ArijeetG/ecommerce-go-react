package controllers

import (
	"ecommerce/models"

	"github.com/gofiber/fiber/v2"
)

func GetMe(c *fiber.Ctx) error {
	user := c.Locals("user").(models.UserResponse)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": 1,
		"data": fiber.Map{
			"user": user,
		},
	})
}
