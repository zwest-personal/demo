package handlers

import (
	"github.com/go-chi/chi/v5"
	"github.com/zwest-personal/demo/services/go-performer/common"
)

var Svc *common.Service

// Init preps our HTTP REST routes using the Chi Go Mux
func Init(s *common.Service) {
	Svc = s

	router := chi.NewRouter()
	if Svc.Cfg.APIPath != "" {
		router.Route(Svc.Cfg.APIPath, func(rg chi.Router) {
			// Helper route for debugging/getting Payment info for an Org
			rg.Get("/connect", establishSocket)
		})
	} else {
		// Handle error or fallback to a default API path
		router.Route("/default", func(rg chi.Router) {
			// Helper route for debugging/getting Payment info for an Org
			rg.Get("/connect", establishSocket)
		})
	}
}
