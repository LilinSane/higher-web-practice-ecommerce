import { Pagination as MantinePagination, Group } from '@mantine/core';
import '@mantine/core/styles.css';
import ArrowIcon from '@/assets/Arrow.svg?react';
import React from 'react';

interface PaginationProps {
    totalPages: number;
    onPageChange: (selectedPage: number) => void;
    currentPage: number;
}

export function Pagination({ totalPages, onPageChange, currentPage }: PaginationProps) {
    return (
        <MantinePagination
            total={totalPages}
            value={currentPage}
            onChange={onPageChange}
            color="#1E40AF"
            nextIcon={() => (
                <Group gap={4}>
                    <ArrowIcon style={{ transform: 'rotate(180deg)' }} />
                </Group>
            )}
            previousIcon={() => (
                <Group gap={4}>
                    <ArrowIcon />
                </Group>
            )}
            styles={{
                control: {
                    border: 'none',
                },

            }}
            size="md"
        />
    );
}