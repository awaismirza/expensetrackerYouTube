import {Injectable} from '@angular/core';
import {
	concat,
	countBy,
	every,
	filter,
	find,
	findIndex,
	flattenDepth,
	forEach,
	head,
	includes,
	isArray,
	isEmpty,
	last,
	map,
	orderBy,
	pull,
	pullAllWith,
	pullAt,
	reduce,
	sortBy,
    isNull
} from 'lodash';


/**
 * Wrapper Service for Lodash Functions
 */
@Injectable({
	providedIn: 'root'
})
export class LodashService {

	/**
	 * Constructor Function for Lodash Service
	 */
	constructor() {
	}

	/**
	 * @ignore
	 */
	get isEmpty() {
		return isEmpty;
	}

	/**
	 * @ignore
	 */
	get isArray() {
		return isArray;
	}

	/**
	 * @ignore
	 */
	get forEach() {
		return forEach;
	}

	/**
	 * @ignore
	 */
	get find() {
		return find;
	}

	/**
	 * @ignore
	 */
	get findIndex() {
		return findIndex;
	}

	/**
	 * @ignore
	 */
	get flattenDepth() {
		return flattenDepth;
	}

	/**
	 * @ignore
	 */
	get pullAllWith() {
		return pullAllWith;
	}

	/**
	 * @ignore
	 */
	get pullAt() {
		return pullAt;
	}

	/**
	 * @ignore
	 */
	get pull() {
		return pull;
	}

	/**
	 * @ignore
	 */
	get every() {
		return every;
	}

	/**
	 * @ignore
	 */
	get countBy() {
		return countBy;
	}

	/**
	 * @ignore
	 */
	get map() {
		return map;
	}

	/**
	 * @ignore
	 */
	get filter() {
		return filter;
	}

	/**
	 * @ignore
	 */
	get reduce() {
		return reduce;
	}

	/**
	 * @ignore
	 */
	get orderBy() {
		return orderBy;
	}

	/**
	 * @ignore
	 */
	get includes() {
		return includes;
	}

	/**
	 * @ignore
	 */
	get sortBy() {
		return sortBy;
	}

	/**
	 * @ignore
	 */
	get last() {
		return last;
	}

	/**
	 * @ignore
	 */
	get head() {
		return head;
	}

	/**
	 * @ignore
	 */
	get concat() {
		return concat;
	}

	/**
	 * @ignore
	 */
	get isNull() {
		return isNull;
	}
}
