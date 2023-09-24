package models

import "github.com/google/uuid"

type Item struct {
	ID          *uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	Title       string     `gorm:"type:varchar(100);not null"`
	Description string     `gorm:"type:varchar(250)"`
	Price       int64      `gorm:"type:int;not null"`
	Author      User       `gorm:"foreignKey:AuthorID"`
	AuthorID    uuid.UUID  `gorm:"type:uuid;not null"`
}

type RegisterItemInput struct {
	Title       string    `json:"title" validate:"required"`
	Description string    `json:"description"`
	Price       int64     `json:"price" validate:"required"`
	AuthorID    uuid.UUID `json:"author" validate:"required"`
}

type ItemResponse struct {
	ID          uuid.UUID
	Title       string       `json:"name,omitempty"`
	Description string       `json:"description,omitempty"`
	Price       int64        `json:"price,omitempty"`
	Author      UserResponse `json:"author"`
}

func FilterItemResponse(item *Item) ItemResponse {
	return ItemResponse{
		ID:          *item.ID,
		Title:       item.Title,
		Description: item.Description,
		Price:       item.Price,
		Author: UserResponse{
			ID:    *item.Author.ID,
			Name:  item.Author.Name,
			Email: item.Author.Email,
		},
	}
}
