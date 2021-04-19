import React from 'react';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';

const SEARCH_ITEMS_QUERY = gql`
	query SEARCH_ITEMS_QUERY($searchTerm: String!) {
		results: allProducts(where: { OR: [{ name_contains_i: $searchTerm }, { description_contains_i: $searchTerm }] }) {
			id
			name
			photo {
				image {
					publicUrlTransformed
				}
			}
		}
	}
`;

const Search = () => {
	resetIdCounter();
	const router = useRouter();
	const [findProducts, { loading, error, data }] = useLazyQuery(SEARCH_ITEMS_QUERY, { fetchPolicy: 'no-cache' });
	const findProductsDebounced = debounce(findProducts, 400);
	const items = data?.results || [];
	const {
		isOpen,
		getComboboxProps,
		getInputProps,
		getMenuProps,
		getItemProps,
		inputValue,
		highlightedIndex,
	} = useCombobox({
		items,
		onInputValueChange({ inputValue }) {
			findProductsDebounced({
				variables: {
					searchTerm: inputValue,
				},
			});
		},
		onSelectedItemChange({ selectedItem }) {
			console.log(selectedItem);
			router.push(`/product/${selectedItem.id}`);
		},
		itemToString: (item) => item?.name || '',
	});
	return (
		<SearchStyles>
			<div {...getComboboxProps()}>
				<input
					{...getInputProps({
						id: 'search',
						placeholder: 'Search for any product',
						type: 'search',
						className: loading ? 'loading' : '',
					})}
				/>
			</div>
			<DropDown {...getMenuProps()}>
				{isOpen &&
					items.map((item, index) => (
						<DropDownItem
							key={item.id}
							{...getItemProps({
								item,
							})}
							highlighted={index === highlightedIndex}
						>
							<img src={item.photo.image.publicUrlTransformed} alt={item.name} width="50" />
							{item.name}
						</DropDownItem>
					))}
				{isOpen && !items.length && !loading && <DropDownItem>No items found</DropDownItem>}
			</DropDown>
		</SearchStyles>
	);
};

export default Search;
