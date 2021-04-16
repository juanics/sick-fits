import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const Dot = styled.div`
	background: var(--red);
	color: white;
	border-radius: 50%;
	padding: 0.25rem 0.5rem 0.25rem 0.25rem;
	margin: 0 0.3rem;
	font-feature-settings: 'tnum';
	font-variant-numeric: tabular-nums;
`;

const AnimationStyles = styled.span`
	position: relative;
	.count {
		display: block;
		position: relative;
		transition: transform 0.4s;
		backface-visibility: hidden;
	}
	.count-enter {
		transform: scale(4) rotateX(180deg);
	}
	.count-enter-active {
		transform: rotateX(0);
	}

	.count-exit {
		top: 0;
		position: absolute;
		transform: rotateX(0);
	}
	.count-exit-active {
		background: pink;
		transform: scale(4) rotateX(180deg);
	}
`;

const CartCount = ({ count }) => {
	return (
		<AnimationStyles>
			<TransitionGroup>
				<CSSTransition
					unmountOnExit
					classNames="count"
					classNames="count"
					key={count}
					timeout={{ enter: 400, exit: 400 }}
               
				>
					<Dot>{count}</Dot>
				</CSSTransition>
			</TransitionGroup>
		</AnimationStyles>
	);
};

export default CartCount;
