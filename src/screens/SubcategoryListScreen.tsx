import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import godsData from '../data/gods.json';
import stotrasData from '../data/stotras.json';
import { GodCard } from '../types';
import PremiumHeader from '../components/ui/PremiumHeader';
import StotraListItem from '../components/ui/StotraListItem';
import PageContainer from '../components/ui/PageContainer';
import PremiumButton from '../components/ui/PremiumButton';

const SubcategoryListScreen = () => {
  const navigate = useNavigate();
  const { godId, category } = useParams();
  const gods: GodCard[] = godsData;
  const selectedGod = gods.find(g => g.id === godId);
  const currentCategory = selectedGod?.categories?.find(c => c.id === category);

  // Filter stotras by godId and category (case-insensitive)
  const filteredItems = stotrasData.filter(item =>
    item.godId === godId && item.category.toLowerCase() === category?.toLowerCase()
  );

  return (
    <PageContainer>
      <PremiumHeader
        showBack
        onBack={() => navigate(`/god/${godId}`)}
        titleTe={currentCategory?.nameTe || category}
        titleEn={currentCategory?.nameEn || category}
      />

      <div className="premium-list-content" style={{ paddingTop: '1rem' }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <StotraListItem
              key={item.id}
              id={item.id}
              titleTe={item.titleTe}
              titleEn={item.titleEn}
              index={index + 1}
              onClick={() => navigate(`/god/${godId}/${category}/${item.id}`)}
            />
          ))
        ) : (
          <div className="premium-empty-state">
            <div className="premium-empty-icon" aria-hidden="true">📖</div>
            <p>No {category} found for this deity yet.</p>
            <PremiumButton onClick={() => navigate(`/god/${godId}`)}>Go Back</PremiumButton>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default SubcategoryListScreen;
