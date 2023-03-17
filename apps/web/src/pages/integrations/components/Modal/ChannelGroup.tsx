import { Container, Grid } from '@mantine/core';
import { Title } from '../../../../design-system';
import { ChannelTypeEnum, EmailProviderIdEnum } from '@novu/shared';
import { IIntegratedProvider } from '../../IntegrationsStorePage';
import { When } from '../../../../components/utils/When';
import { CONTEXT_PATH, IS_DOCKER_HOSTED } from '../../../../config';
import { ProviderCard } from './ProviderCard';
import { NovuIntegrationCard } from './NovuIntegrationCard';

export function ChannelGroup({
  title,
  providers,
  onProviderClick,
  channel,
  selectedProvider,
}: {
  providers: IIntegratedProvider[];
  title: string;
  selectedProvider?: string;
  onProviderClick: (visible: boolean, create: boolean, provider: IIntegratedProvider) => void;
  channel: ChannelTypeEnum;
}) {
  function handlerOnConnectClick(visible: boolean, create: boolean, provider: IIntegratedProvider) {
    onProviderClick(visible, create, provider);
  }

  return (
    <Container id={channel} fluid>
      <Grid mx={0} mb={50}>
        <Grid.Col span={12} data-test-id={`integration-group-${title.toLowerCase()}`}>
          <Title size={2}>{title}</Title>
        </Grid.Col>
        <When truthy={channel === ChannelTypeEnum.EMAIL && !IS_DOCKER_HOSTED}>
          <Grid.Col lg={selectedProvider ? 4 : 3} xl={selectedProvider ? 3 : 2}>
            <NovuIntegrationCard
              selected={selectedProvider === EmailProviderIdEnum.Novu}
              provider={{
                providerId: EmailProviderIdEnum.Novu,
                integrationId: '',
                displayName: 'Novu Email Provider',
                channel: ChannelTypeEnum.EMAIL,
                credentials: [],
                docReference: '',
                comingSoon: false,
                active:
                  providers.filter((provider) => provider.active && provider.channel === ChannelTypeEnum.EMAIL)
                    .length === 0,
                connected: true,
                logoFileName: {
                  light: CONTEXT_PATH + '/static/images/logo-formerly-light-bg.png',
                  dark: CONTEXT_PATH + '/static/images/logo-formerly-dark-bg.png',
                },
                betaVersion: false,
                novu: true,
              }}
              onConnectClick={handlerOnConnectClick}
            />
          </Grid.Col>
        </When>
        {providers.map((provider) => (
          <Grid.Col lg={selectedProvider ? 4 : 3} xl={selectedProvider ? 3 : 2} key={provider.providerId}>
            <ProviderCard
              selected={selectedProvider === provider.providerId}
              provider={provider}
              onConnectClick={handlerOnConnectClick}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
