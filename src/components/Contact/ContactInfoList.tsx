import { Stack, Text, ThemeIcon, Anchor, Box } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import { IconMapPin, IconPhone, IconReceipt, IconBuildingBank, IconNumber } from '@tabler/icons-react';
import classes from './ContactIcons.module.css';

export async function ContactInfoList() {
  const tContact = await getTranslations('ContactDetails');
  const tFooter = await getTranslations('Footer');

  const contactData = [
    { icon: IconMapPin, title: tFooter('addressLabel'), description: tContact('address') },
    { icon: IconPhone, title: tFooter('phoneLabel'), description: tContact('phone'), isPhone: true },
    { icon: IconReceipt, title: tFooter('nipLabel'), description: tContact('nip') },
    { icon: IconNumber, title: tFooter('regonLabel'), description: tContact('regon') },
    { icon: IconBuildingBank, title: tFooter('bankAccountLabel'), description: `${tContact('bankAccount')} (${tFooter('bankName')})` },
  ];

  return (
    <Stack gap="lg">
      {contactData.map((item) => (
        <div className={classes.contactWrapper} key={item.title}>
          <Box className={classes.iconWrapper} mr="md">
            <ThemeIcon variant="transparent" size={28}>
              <item.icon color="var(--mantine-color-white)" stroke={1.5}/>
            </ThemeIcon>
          </Box>
          <div>
            <Text size="xs" className={classes.contactTitle}>
              {item.title}
            </Text>
            {item.isPhone ? (
               <Anchor
                 href={`tel:${item.description.replace(/\s|\+/g, '')}`}
                 className={classes.contactDescription}
                 size="sm"
                 inherit
               >
                {item.description}
               </Anchor>
             ) : (
               <Text className={classes.contactDescription} size="sm">
                 {item.description}
               </Text>
            )}
          </div>
        </div>
      ))}
    </Stack>
  );
}