"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi2";
import { deleteCategory } from '@/services/categories';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import CategoryDialog from './CategoryDialog';
import { SubCategories } from '@/types/subcategory';
import { deleteSubCategory } from '@/services/subCategories';
import { Categories } from '@/types';
import SubCategoryDialog from './SubCategoryDialog';
import { toast } from 'sonner';



function DataTable({ data, type }: { data: Categories | SubCategories, type: 'categories' | 'subcategories' }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);
  const handleDelete = async (id: number, name: string) => {
    if (type === 'categories') {
      toast(`¿Estás seguro de eliminar la Categoría '${name}'?`, {
        action: {
          label: "OK",
          onClick: async () => {
            const { message } = await deleteCategory(id);
            router.refresh();
            toast(message, {
              description: "Se ha eliminado la categoría",
            });
          },
        },
      });
    } else {
      toast(`¿Estás seguro de eliminar la sub-categoría '${name}'?`, {
        action: {
          label: "OK",
          onClick: async () => {
            const { message } = await deleteSubCategory(id);
            router.refresh();
            toast(message, {
              description: "Se ha eliminado la sub-categoría",
            });
          },
        },
      });
    }
  };

  return (
    <div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className='bg-blue-50'>
            <TableRow>
              {
                type === 'subcategories' &&
                <TableHead className="text-left">Categoría</TableHead>
              }
              <TableHead className="text-left">Nombre</TableHead>
              <TableHead className="text-left">Descripción</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 && type === 'subcategories' && (data as SubCategories).map((item) => (
              <TableRow key={item.id}>
                <TableCell className='text-start'>{item.categoryName}</TableCell>
                <TableCell className='text-start'>{item.name}</TableCell>
                <TableCell className='text-start'>{item.description}</TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">...</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='min-w-0'>
                      <DropdownMenuGroup>
                        <DropdownMenuItem className='p-0'>
                          <Button variant='ghost' onClick={() => setEditingId(item.id)}>
                            <HiOutlinePencilAlt className='text-blue-600' />
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='p-0'>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(item.id, item.name)}
                            className='w-full'
                          >
                            <HiOutlineTrash className='text-destructive' />
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

            {data.length > 0 && type === 'categories' && (data as Categories).map((item) => (
              <TableRow key={item.id}>
                <TableCell className='text-start'>{item.name}</TableCell>
                <TableCell className='text-start'>{item.description}</TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">...</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='min-w-0'>
                      <DropdownMenuGroup>
                        <DropdownMenuItem className='p-0'>
                          <Button variant='ghost' onClick={() => setEditingId(item.id)}>
                            <HiOutlinePencilAlt className='text-blue-600' />
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='p-0'>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(item.id, item.name)}
                            className='w-full'
                          >
                            <HiOutlineTrash className='text-destructive' />
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingId !== null && type == 'categories' ? (
        <CategoryDialog
          id={editingId}
          open={editingId !== null}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditingId(null);
          }}
        />) : (
        <SubCategoryDialog
          subCategoryId={editingId}
          open={editingId !== null}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditingId(null);
          }}
        />
      )
      }
    </div >
  )
}

export default DataTable