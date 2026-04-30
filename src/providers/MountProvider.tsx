'use client'
import React, { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
	const styles = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
		background: 'radial-gradient(ellipse at top, #1A1A1A 0%, #0A0A0A 100%)',
		color: '#F5F5F5',
		position: 'fixed',
		top: 0,
		left: 0,
		zIndex: 9999,
		gap: '30px',
		fontFamily: "'Playfair Display', 'Times New Roman', serif",
	} as React.CSSProperties;

	const LoadingComplex = () => (
		<div style={{ textAlign: 'center' }}>
			{/* Золотой логотип/символ */}
			<motion.div
				style={{
					width: '80px',
					height: '80px',
					margin: '0 auto',
					position: 'relative',
				}}
			>
				{/* Звезда в центре */}
				<motion.div
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: '40px',
					}}
					animate={{
						scale: [1, 1.2, 1],
						rotate: [0, 360]
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				>
					✧
				</motion.div>

				{/* Внешнее золотое кольцо */}
				<motion.div
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						border: '2px solid rgba(212, 175, 55, 0.2)',
						borderRadius: '50%',
					}}
				/>

				{/* Вращающееся золотое кольцо */}
				<motion.div
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						border: '2px solid transparent',
						borderTop: '2px solid #D4AF37',
						borderRadius: '50%',
					}}
					animate={{ rotate: 360 }}
					transition={{
						duration: 1,
						repeat: Infinity,
						ease: "linear"
					}}
				/>

				{/* Вращающееся в обратную сторону кольцо */}
				<motion.div
					style={{
						position: 'absolute',
						width: '70%',
						height: '70%',
						top: '15%',
						left: '15%',
						border: '2px solid transparent',
						borderRight: '2px solid rgba(212, 175, 55, 0.6)',
						borderRadius: '50%',
					}}
					animate={{ rotate: -360 }}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						ease: "linear"
					}}
				/>
			</motion.div>

			{/* Текст загрузки */}
			<motion.p
				style={{
					marginTop: '30px',
					fontSize: '14px',
					letterSpacing: '4px',
					color: '#D4AF37',
					fontWeight: '500',
					textTransform: 'uppercase',
				}}
				animate={{
					opacity: [0.4, 1, 0.4],
				}}
				transition={{
					duration: 1.5,
					repeat: Infinity,
					ease: "easeInOut"
				}}
			>
				Загрузка ароматов...
			</motion.p>

			{/* Декоративная линия */}
			<motion.div
				style={{
					width: '50px',
					height: '1px',
					background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
					margin: '15px auto 0',
				}}
				animate={{
					width: ['50px', '100px', '50px'],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: "easeInOut"
				}}
			/>
		</div>
	);

	return (
		<motion.div
			style={styles}
			initial={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.6, ease: "easeInOut" }}
		>
			<LoadingComplex />
		</motion.div>
	);
}

export const MountProvider = ({ children }: { children?: ReactNode }) => {
	const [showContent, setShowContent] = useState(false);
	const [renderContent, setRenderContent] = useState(false);
	const timeout = process.env.NODE_ENV === 'production' ? 4000 : 4000;

	useEffect(() => {
		setRenderContent(true);
		const timer = setTimeout(() => {
			setShowContent(true);
		}, timeout);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<AnimatePresence mode="wait">
				{!showContent && <Loader />}
			</AnimatePresence>
			<AnimatePresence>
				{renderContent && (
					<motion.div
						style={{ display: 'contents' }}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.6,
							delay: timeout / 1000,
							ease: [0.4, 0, 0.2, 1]
						}}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

export default MountProvider;