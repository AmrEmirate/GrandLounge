"use client";

import { useState, useEffect, useCallback } from "react";
import apiHelper from "@/lib/apiHelper";
import type { Property } from "@/lib/types";
import { useToast } from "@/hooks/ui/use-toast";

export function useTenantProperties() {
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        search: searchTerm,
        page: page.toString(),
        limit: "6",
        sortBy,
        sortOrder,
      });

      const response = await apiHelper.get(
        `/properties/my-properties/all?${params.toString()}`
      );

      setProperties(response.data.data);
      if (response.data.pagination) {
        setTotalPages(response.data.pagination.totalPages);
      } else {
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to fetch tenant properties:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch your properties.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, page, sortBy, sortOrder, toast]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleDeleteProperty = async (propertyId: string) => {
    try {
      await apiHelper.delete(`/properties/my-properties/${propertyId}`);
      toast({
        title: "Success",
        description: "Property has been deleted.",
      });
      fetchProperties(); // Muat ulang data setelah berhasil menghapus
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete property.",
      });
    }
  };

  return {
    properties,
    isLoading,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    totalPages,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    handleDeleteProperty,
    refetchProperties: fetchProperties,
  };
}
