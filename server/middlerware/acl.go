package middlerware

import (
	"ecommerce/models"
	"log"

	"github.com/gofiber/fiber/v2"
)

func ACL(c *fiber.Ctx) error {
	log.Println(c.Locals("user").(models.UserResponse))
	user, ok := c.Locals("user").(models.UserResponse)

	log.Println(user)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"status":  0,
			"message": "unauthorized",
		})
	}

	role := user.Role
	log.Println(role)
	adminRole := "admin"
	if role == adminRole {
		return c.Next()
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"status":  0,
			"message": "unauthorized",
		})
	}
}
